const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

const presets = [
  {id:'alexa35', name:'ARRI ALEXA 35', width:27.99},
  {id:'miniLF', name:'ARRI ALEXA Mini LF', width:36.70},
  {id:'venice2', name:'Sony VENICE 2', width:35.90},
  {id:'fx6', name:'Sony FX6', width:35.60},
  {id:'vraptor', name:'RED V-RAPTOR VV', width:40.96},
  {id:'ff', name:'Full Frame 36 mm', width:36.00},
  {id:'s35', name:'Super 35 générique', width:24.89},
  {id:'apsc', name:'APS-C générique', width:23.50},
  {id:'mft', name:'Micro 4/3', width:17.30}
];

const lenses = [14,18,21,24,25,28,32,35,40,50,65,75,85,100,135];
const ratios = [
  {label:'2.39:1', value:2.39},{label:'2.00:1', value:2.0},
  {label:'1.85:1', value:1.85},{label:'16:9', value:16/9},
  {label:'4:3', value:4/3},{label:'1:1', value:1},
  {label:'4:5', value:4/5},{label:'9:16', value:9/16}
];

const state = {
  stream:null,
  devices:[],
  deviceId:null,
  preset:presets[0],
  sensorWidth:presets[0].width,
  focal:35,
  ratio:2.39,
  guides:new Set(),
  sourceFov:null,
  proPoints:[],
  proRefPreset:presets.find(p=>p.id==='fx6') || presets[0],
  proRefFocal:24,
  proScale:1,
  orientation: innerWidth >= innerHeight ? 'landscape' : 'portrait',
  calLeft:.30,
  calRight:.70
};

function deg(r){ return r*180/Math.PI }
function rad(d){ return d*Math.PI/180 }
function targetHFov(){ return deg(2*Math.atan(state.sensorWidth/(2*state.focal))); }
function orientationKey(){
  return `${state.deviceId || 'default'}:${state.orientation}`;
}
function calibrationStore(){
  try{return JSON.parse(localStorage.getItem('frame-calibrations')||'{}')}catch{return {}}
}
function loadCalibration(){
  const data=calibrationStore()[orientationKey()];
  if(data?.version === 3){
    state.sourceFov = data.quickHFov || null;
    state.proPoints = Array.isArray(data.proPoints) ? data.proPoints : [];
  }else if(data?.version === 2){
    // Keep V1.1 quick calibration as a fallback.
    state.sourceFov = data.hfov || null;
    state.proPoints = [];
  }else{
    state.sourceFov = null;
    state.proPoints = [];
  }
  updateCalibrationStatus();
  updateSimulation();
  renderProPoints();
}
function writeCalibrationProfile(){
  const all=calibrationStore();
  all[orientationKey()]={
    version:3,
    quickHFov:state.sourceFov || null,
    proPoints:state.proPoints,
    savedAt:new Date().toISOString()
  };
  localStorage.setItem('frame-calibrations',JSON.stringify(all));
}
function saveCalibration(hfov){
  state.sourceFov=hfov;
  writeCalibrationProfile();
  updateCalibrationStatus();
  updateSimulation();
}
function saveProPoint(point){
  const tolerance=.0005;
  const ix=state.proPoints.findIndex(p=>Math.abs(p.x-point.x)<tolerance);
  if(ix>=0) state.proPoints[ix]=point;
  else state.proPoints.push(point);
  state.proPoints.sort((a,b)=>a.x-b.x);
  writeCalibrationProfile();
  updateCalibrationStatus();
  renderProPoints();
  updateSimulation();
}
function deleteProPoint(index){
  state.proPoints.splice(index,1);
  writeCalibrationProfile();
  updateCalibrationStatus();
  renderProPoints();
  updateSimulation();
}
function resetCalibration(){
  const all=calibrationStore();
  delete all[orientationKey()];
  localStorage.setItem('frame-calibrations',JSON.stringify(all));
  state.sourceFov=null;
  state.proPoints=[];
  updateCalibrationStatus();
  updateSimulation();
  renderProPoints();
}

function renderLenses(){
  const el=$('#lensStrip'); el.innerHTML='';
  lenses.forEach(mm=>{
    const b=document.createElement('button');
    b.className='lens-pill'+(mm===state.focal?' active':'');
    b.textContent=mm;
    b.onclick=()=>{state.focal=mm; renderLenses(); updateAll(); centerActiveLens();};
    el.appendChild(b);
  });
  setTimeout(centerActiveLens,0);
}
function centerActiveLens(){
  const a=$('.lens-pill.active'); if(a) a.scrollIntoView({behavior:'smooth',inline:'center',block:'nearest'});
}
function renderPresets(){
  const el=$('#presetList'); el.innerHTML='';
  presets.forEach(p=>{
    const b=document.createElement('button');
    b.type='button'; b.className='choice'+(state.preset.id===p.id?' active':'');
    b.innerHTML=`<strong>${p.name}</strong><small>largeur active de référence : ${p.width.toFixed(2)} mm</small>`;
    b.onclick=()=>{
      state.preset=p; state.sensorWidth=p.width;
      $('#sensorWidthInput').value=p.width.toFixed(2);
      renderPresets(); updateAll(); $('#presetDialog').close();
    };
    el.appendChild(b);
  });
}
function renderRatios(){
  const el=$('#ratioList'); el.innerHTML='';
  ratios.forEach(r=>{
    const b=document.createElement('button'); b.type='button';
    b.className='ratio-choice'+(Math.abs(state.ratio-r.value)<.001?' active':'');
    b.textContent=r.label;
    b.onclick=()=>{state.ratio=r.value; renderRatios(); updateAll(); $('#ratioDialog').close();};
    el.appendChild(b);
  });
}
function ratioLabel(v){ return ratios.find(r=>Math.abs(r.value-v)<.001)?.label || v.toFixed(2)+':1'; }
function renderGuideChoices(){
  const el=$('#guideChoices'); el.innerHTML='';
  ratios.filter(r=>r.value!==state.ratio).forEach(r=>{
    const b=document.createElement('button'); b.type='button';
    b.className='guide-chip'+(state.guides.has(r.label)?' active':'');
    b.textContent=r.label;
    b.onclick=()=>{
      state.guides.has(r.label)?state.guides.delete(r.label):state.guides.add(r.label);
      renderGuideChoices(); renderGuides();
    };
    el.appendChild(b);
  });
}
function frameDimensions(ratio, maxW, maxH){
  let w=maxW, h=w/ratio;
  if(h>maxH){h=maxH; w=h*ratio}
  return {w,h};
}
function updateFrame(){
  const vf=$('.viewfinder');
  const maxW=vf.clientWidth*.90;
  const maxH=vf.clientHeight*.62;
  const {w,h}=frameDimensions(state.ratio,maxW,maxH);
  const f=$('#mainFrame'); f.style.width=w+'px'; f.style.height=h+'px';
  renderGuides();
}
function renderGuides(){
  const layer=$('#guideLayer'); layer.innerHTML='';
  const main=$('#mainFrame');
  const W=main.clientWidth,H=main.clientHeight;
  state.guides.forEach(label=>{
    const r=ratios.find(x=>x.label===label); if(!r)return;
    const {w,h}=frameDimensions(r.value,W,H);
    const d=document.createElement('div'); d.className='guide-frame';
    d.style.width=w+'px'; d.style.height=h+'px';
    d.innerHTML=`<span>${label}</span>`; layer.appendChild(d);
  });
}
function updateReadout(){
  const hf=targetHFov();
  $('#cameraReadout').textContent=state.preset.name.replace('ARRI ','').replace('Sony ','').replace('RED ','');
  $('#cameraPresetText').textContent=state.preset.name;
  $('#focalReadout').textContent=state.focal+' mm';
  $('#ratioReadout').textContent=ratioLabel(state.ratio).replace(':1','');
  $('#ratioText').textContent=ratioLabel(state.ratio);
  $('#hfovReadout').textContent=hf.toFixed(1)+'°';
}
function visibleWidthFractionFor(video){
  const sw=video.videoWidth, sh=video.videoHeight;
  const cw=video.clientWidth, ch=video.clientHeight;
  if(!sw || !sh || !cw || !ch) return 1;
  const sourceAspect=sw/sh;
  const containerAspect=cw/ch;
  return sourceAspect > containerAspect ? containerAspect/sourceAspect : 1;
}

function effectiveDisplayedHFov(){
  const video=$('#video');
  if(!state.sourceFov) return null;
  const visibleWidthFraction=visibleWidthFractionFor(video);
  return deg(2*Math.atan(
    visibleWidthFraction * Math.tan(rad(state.sourceFov)/2)
  ));
}

function interpolateProJ(targetX){
  if(!state.proPoints.length) return null;
  const pts=[...state.proPoints].sort((a,b)=>a.x-b.x);
  if(pts.length===1) return {j:pts[0].j, outside:true};

  if(targetX<=pts[0].x) return {j:pts[0].j, outside:true};
  if(targetX>=pts[pts.length-1].x) return {j:pts[pts.length-1].j, outside:true};

  for(let i=0;i<pts.length-1;i++){
    const a=pts[i], b=pts[i+1];
    if(targetX>=a.x && targetX<=b.x){
      const t=(targetX-a.x)/(b.x-a.x);
      return {j:a.j+(b.j-a.j)*t, outside:false};
    }
  }
  return {j:pts[0].j, outside:true};
}

function updateSimulation(){
  const video=$('#video'), frame=$('#mainFrame'), warning=$('#simWarning');
  warning.classList.add('hidden'); warning.textContent='';

  const target=targetHFov();
  const targetX=Math.tan(rad(target)/2);
  const videoW=video.clientWidth || 1;
  const frameW=frame.clientWidth || videoW;
  const frameFraction=Math.min(1,frameW/videoW);
  const visibleFraction=visibleWidthFractionFor(video);

  // CAL PRO has priority: each real-camera reference point teaches FRAME
  // the actual phone crop response instead of assuming one perfect optical model.
  if(state.proPoints.length){
    const result=interpolateProJ(targetX);
    let scale=frameFraction * visibleFraction * result.j / targetX;
    scale=Math.max(1,Math.min(12,scale));
    video.style.transform=`scale(${scale.toFixed(5)})`;

    if(result.outside && state.proPoints.length>=2){
      const focals=state.proPoints.map(p=>p.focal).filter(Number.isFinite);
      if(focals.length){
        warning.textContent=`CAL PRO · HORS PLAGE ÉTALONNÉE ${Math.min(...focals)}–${Math.max(...focals)} mm`;
        warning.classList.remove('hidden');
      }
    }
    return;
  }

  // Fallback: quick physical calibration.
  if(!state.sourceFov){
    video.style.transform='scale(1)';
    if(state.stream){
      warning.textContent='CALIBRATION REQUISE';
      warning.classList.remove('hidden');
    }
    return;
  }

  const displayed=effectiveDisplayedHFov();
  const availableTan=frameFraction*Math.tan(rad(displayed)/2);
  const neededScale=availableTan/targetX;

  if(neededScale<1){
    video.style.transform='scale(1)';
    const availableHFov=deg(2*Math.atan(availableTan));
    if(target>availableHFov+.5){
      warning.textContent=`CAMÉRA TÉLÉPHONE PAS ASSEZ LARGE · ${availableHFov.toFixed(1)}° dispo / ${target.toFixed(1)}° demandé`;
      warning.classList.remove('hidden');
    }
    return;
  }
  video.style.transform=`scale(${neededScale.toFixed(5)})`;
}

function updateAll(){
  updateReadout(); updateFrame(); updateSimulation(); renderGuideChoices();
}

async function startCamera(deviceId){
  try{
    if(state.stream) state.stream.getTracks().forEach(t=>t.stop());
    const constraints={audio:false,video:deviceId?{deviceId:{exact:deviceId},width:{ideal:1920},height:{ideal:1080}}:{facingMode:{ideal:'environment'},width:{ideal:1920},height:{ideal:1080}}};
    const stream=await navigator.mediaDevices.getUserMedia(constraints);
    state.stream=stream;
    const track=stream.getVideoTracks()[0];
    const settings=track.getSettings();
    state.deviceId=settings.deviceId || deviceId || null;
    $('#video').srcObject=stream;
    $('#calVideo').srcObject=stream;
    $('#proVideo').srcObject=stream;
    $('#video').onloadedmetadata=()=>{updateFrame();updateSimulation()};
    $('#calVideo').onloadedmetadata=()=>{updateCalLines()};
    $('#proVideo').onloadedmetadata=()=>{updateProFrame();prepareProScale()};
    $('#cameraPlaceholder').classList.add('hidden');

    const devices=await navigator.mediaDevices.enumerateDevices();
    state.devices=devices.filter(d=>d.kind==='videoinput');
    renderDeviceSelect();
    loadCalibration();
    updateAll();
  }catch(err){
    console.error(err);
    $('#cameraPlaceholder').classList.remove('hidden');
    $('#cameraPlaceholder span').textContent='Autorise la caméra dans les réglages du navigateur';
  }
}
function renderDeviceSelect(){
  const sel=$('#deviceSelect'); sel.innerHTML='';
  state.devices.forEach((d,i)=>{
    const o=document.createElement('option'); o.value=d.deviceId;
    o.textContent=d.label || `Caméra ${i+1}`;
    o.selected=d.deviceId===state.deviceId; sel.appendChild(o);
  });
}
function updateCalibrationStatus(){
  const s=$('#calStatus'),d=$('#calDetails');
  const cs=$('#chooserCalStatus'), cd=$('#chooserCalDetails');
  const n=state.proPoints.length;

  if(n>=2){
    s.textContent=`CAL PRO ✓ · ${n} pts`;
    d.textContent=`Courbe réelle active · ${state.orientation}`;
    if(cs) cs.textContent=`CAL PRO · ${n} points`;
    if(cd) cd.textContent='FRAME interpole automatiquement entre tes références.';
  }else if(n===1){
    s.textContent='CAL PRO · 1 pt';
    d.textContent='Ajoute au moins un second point pour interpoler.';
    if(cs) cs.textContent='CAL PRO · 1 point';
    if(cd) cd.textContent='Ajoute 35 / 50 / 85 mm pour fiabiliser la courbe.';
  }else if(state.sourceFov){
    s.textContent='CAL RAPIDE ✓';
    d.textContent=`Champ horizontal : ${state.sourceFov.toFixed(2)}° · ${state.orientation}`;
    if(cs) cs.textContent='CAL RAPIDE';
    if(cd) cd.textContent='Calibration physique active. CAL PRO donnera plus de précision.';
  }else{
    s.textContent='Non calibrée';
    d.textContent=`Calibration nécessaire en orientation ${state.orientation}.`;
    if(cs) cs.textContent='Non calibré';
    if(cd) cd.textContent='Aucun point enregistré.';
  }
}

function calibrationContentRect(){
  const preview=$('#calPreview'), video=$('#calVideo');
  const r=preview.getBoundingClientRect();
  const sw=video.videoWidth, sh=video.videoHeight;
  if(!sw || !sh) return {left:0, top:0, width:r.width, height:r.height};

  const sourceAspect=sw/sh;
  const boxAspect=r.width/r.height;
  let width,height,left,top;
  if(sourceAspect > boxAspect){
    width=r.width; height=width/sourceAspect;
    left=0; top=(r.height-height)/2;
  }else{
    height=r.height; width=height*sourceAspect;
    top=0; left=(r.width-width)/2;
  }
  return {left,top,width,height};
}

function setupCalibrationDrag(){
  const preview=$('#calPreview');
  const attach=(el,key)=>{
    const move=(clientX)=>{
      const r=preview.getBoundingClientRect();
      const c=calibrationContentRect();
      let x=(clientX-r.left-c.left)/c.width;
      x=Math.max(0.02,Math.min(.98,x));
      if(key==='calLeft') x=Math.min(x,state.calRight-.03);
      else x=Math.max(x,state.calLeft+.03);
      state[key]=x; updateCalLines();
    };
    el.addEventListener('pointerdown',e=>{el.setPointerCapture(e.pointerId); move(e.clientX)});
    el.addEventListener('pointermove',e=>{if(el.hasPointerCapture(e.pointerId))move(e.clientX)});
  };
  attach($('#calLeft'),'calLeft'); attach($('#calRight'),'calRight');
}
function updateCalLines(){
  const preview=$('#calPreview');
  const r=preview.getBoundingClientRect();
  const c=calibrationContentRect();
  const leftPx=c.left + state.calLeft*c.width;
  const rightPx=c.left + state.calRight*c.width;
  $('#calLeft').style.left=leftPx+'px';
  $('#calRight').style.left=rightPx+'px';
  $('#calLeft').style.top=c.top+'px';
  $('#calLeft').style.height=c.height+'px';
  $('#calLeft').style.bottom='auto';
  $('#calRight').style.top=c.top+'px';
  $('#calRight').style.height=c.height+'px';
  $('#calRight').style.bottom='auto';
  calculateCalibration();
}
function calculateCalibration(){
  const widthM=(parseFloat($('#objectWidth').value)||0)/100;
  const dist=parseFloat($('#objectDistance').value)||0;
  const p=state.calRight-state.calLeft;
  if(widthM<=0||dist<=0||p<=0){$('#calFov').textContent='—'; return null}
  const objectAngle=2*Math.atan(widthM/(2*dist));
  const hfov=2*Math.atan(Math.tan(objectAngle/2)/p);
  const val=deg(hfov);
  $('#calFov').textContent=(val>5&&val<170)?val.toFixed(2)+'°':'—';
  return (val>5&&val<170)?val:null;
}


function targetHFovFor(width,focal){
  return deg(2*Math.atan(width/(2*focal)));
}
function renderProPresetSelect(){
  const sel=$('#proPresetSelect');
  if(!sel) return;
  sel.innerHTML='';
  presets.forEach(p=>{
    const o=document.createElement('option');
    o.value=p.id; o.textContent=p.name;
    o.selected=p.id===state.proRefPreset.id;
    sel.appendChild(o);
  });
}
function renderProLenses(){
  const el=$('#proLensStrip');
  if(!el) return;
  el.innerHTML='';
  lenses.forEach(mm=>{
    const b=document.createElement('button');
    b.type='button';
    b.className='pro-lens'+(mm===state.proRefFocal?' active':'');
    const saved=state.proPoints.some(p=>p.presetId===state.proRefPreset.id && p.focal===mm);
    b.innerHTML=`${mm}${saved?'<i>✓</i>':''}`;
    b.onclick=()=>{
      state.proRefFocal=mm;
      renderProLenses();
      prepareProScale();
      updateProHUD();
    };
    el.appendChild(b);
  });
  setTimeout(()=>{
    const a=$('#proLensStrip .pro-lens.active');
    if(a) a.scrollIntoView({behavior:'smooth',inline:'center',block:'nearest'});
  },0);
}
function proReferenceHFov(){
  return targetHFovFor(state.proRefPreset.width,state.proRefFocal);
}
function updateProHUD(){
  const hf=proReferenceHFov();
  $('#proTopReference').textContent=`${state.proRefPreset.name} · ${state.proRefFocal} mm`;
  $('#proTargetFov').textContent=hf.toFixed(1)+'°';
  $('#proFrameLabel').textContent=ratioLabel(state.ratio);
  $('#proScaleReadout').textContent=state.proScale.toFixed(3)+'×';
}
function updateProFrame(){
  const stage=$('#proStage'), f=$('#proFrame');
  if(!stage||!f) return;
  const maxW=stage.clientWidth*.90;
  const maxH=stage.clientHeight*.62;
  const dims=frameDimensions(state.ratio,maxW,maxH);
  f.style.width=dims.w+'px';
  f.style.height=dims.h+'px';
  updateProHUD();
}
function applyProScale(){
  const v=$('#proVideo');
  state.proScale=Math.max(1,Math.min(8,Number(state.proScale)||1));
  $('#proScaleSlider').value=state.proScale;
  $('#proScaleReadout').textContent=state.proScale.toFixed(3)+'×';
  v.style.transform=`scale(${state.proScale.toFixed(5)})`;
}
function findExistingProPoint(){
  return state.proPoints.find(p=>
    p.presetId===state.proRefPreset.id &&
    p.focal===state.proRefFocal
  );
}
function scaleFromProPoint(point){
  const video=$('#proVideo'), frame=$('#proFrame');
  const targetX=Math.tan(rad(proReferenceHFov())/2);
  const frameFraction=Math.min(1,(frame.clientWidth||video.clientWidth||1)/(video.clientWidth||1));
  const visibleFraction=visibleWidthFractionFor(video);
  if(!frameFraction || !visibleFraction) return 1;
  return frameFraction*visibleFraction*point.j/targetX;
}
function quickEstimateForPro(){
  if(!state.sourceFov) return 1;
  const video=$('#proVideo'), frame=$('#proFrame');
  const sourceVisible=deg(2*Math.atan(
    visibleWidthFractionFor(video)*Math.tan(rad(state.sourceFov)/2)
  ));
  const target=proReferenceHFov();
  const targetX=Math.tan(rad(target)/2);
  const frameFraction=Math.min(1,(frame.clientWidth||video.clientWidth||1)/(video.clientWidth||1));
  return Math.max(1,frameFraction*Math.tan(rad(sourceVisible)/2)/targetX);
}
function prepareProScale(){
  updateProFrame();
  const existing=findExistingProPoint();
  if(existing){
    state.proScale=scaleFromProPoint(existing);
  }else if(state.proPoints.length){
    const targetX=Math.tan(rad(proReferenceHFov())/2);
    const res=interpolateProJ(targetX);
    const pseudo={j:res.j};
    state.proScale=scaleFromProPoint(pseudo);
  }else{
    state.proScale=quickEstimateForPro();
  }
  applyProScale();
  updateProHUD();
}
function saveCurrentProPoint(){
  const video=$('#proVideo'), frame=$('#proFrame');
  if(!video.videoWidth || !frame.clientWidth) return;
  const hfov=proReferenceHFov();
  const x=Math.tan(rad(hfov)/2);
  const frameFraction=Math.min(1,frame.clientWidth/(video.clientWidth||1));
  const visibleFraction=visibleWidthFractionFor(video);

  // Normalize the hand-matched scale so the learned point survives
  // small UI size/ratio changes while keeping the phone camera behavior.
  const j=state.proScale*x/(frameFraction*visibleFraction);

  saveProPoint({
    x,j,hfov,
    focal:state.proRefFocal,
    presetId:state.proRefPreset.id,
    presetName:state.proRefPreset.name,
    sensorWidth:state.proRefPreset.width,
    ratio:state.ratio,
    savedAt:new Date().toISOString()
  });
  renderProLenses();
  updateProHUD();
}
function renderProPoints(){
  const el=$('#proPointsList');
  if(!el) return;
  el.innerHTML='';
  if(!state.proPoints.length){
    el.innerHTML='<div class="pro-empty">Aucun point. Commence par 24 mm, puis 35, 50 et 85.</div>';
    return;
  }
  const pts=[...state.proPoints].sort((a,b)=>a.focal-b.focal);
  pts.forEach(p=>{
    const actualIndex=state.proPoints.indexOf(p);
    const row=document.createElement('div');
    row.className='pro-point';
    row.innerHTML=`<div><strong>${p.focal} mm</strong><span>${p.presetName} · ${p.hfov.toFixed(1)}°</span></div><button type="button">×</button>`;
    row.querySelector('button').onclick=()=>{deleteProPoint(actualIndex);renderProLenses()};
    el.appendChild(row);
  });
}
function openProCalibration(){
  const go=()=>{
    $('#proVideo').srcObject=state.stream;
    renderProPresetSelect();
    renderProLenses();
    renderProPoints();
    $('#proCalDialog').showModal();
    requestAnimationFrame(()=>{updateProFrame();prepareProScale()});
  };
  if(!state.stream) startCamera().then(go); else go();
}
function openQuickCalibration(){
  const go=()=>{$('#calDialog').showModal();updateCalLines()};
  if(!state.stream) startCamera().then(go); else go();
}

function registerEvents(){
  $('#startCameraBtn').onclick=()=>startCamera();
  $('#cameraBtn').onclick=()=>{$('#cameraDialog').showModal();updateCalibrationStatus()};
  $('#restartCameraBtn').onclick=()=>startCamera($('#deviceSelect').value);

  $('#calBtn').onclick=()=>openCalibrationChooser();
  $('#openCalFromCamera').onclick=()=>{$('#cameraDialog').close();openCalibrationChooser()};
  $('#openQuickCalBtn').onclick=()=>{$('#calChooserDialog').close();openQuickCalibration()};
  $('#openProCalBtn').onclick=()=>{$('#calChooserDialog').close();openProCalibration()};
  $('#closeProCalBtn').onclick=()=>$('#proCalDialog').close();

  $('#proPresetSelect').onchange=e=>{
    state.proRefPreset=presets.find(p=>p.id===e.target.value)||presets[0];
    renderProLenses(); prepareProScale(); updateProHUD();
  };
  $('#proScaleSlider').oninput=e=>{state.proScale=parseFloat(e.target.value);applyProScale()};
  $('#proMinusBtn').onclick=()=>{state.proScale-=.01;applyProScale()};
  $('#proPlusBtn').onclick=()=>{state.proScale+=.01;applyProScale()};
  $('#saveProPointBtn').onclick=()=>saveCurrentProPoint();

  $('#settingsBtn').onclick=()=>$('#settingsDialog').showModal();
  $('#cameraPresetBtn').onclick=()=>{$('#sensorWidthInput').value=state.sensorWidth.toFixed(2);$('#presetDialog').showModal()};
  $('#ratioBtn').onclick=()=>$('#ratioDialog').showModal();
  $('#applySensorBtn').onclick=()=>{
    const w=parseFloat($('#sensorWidthInput').value);
    if(w>5&&w<70){state.sensorWidth=w;state.preset={id:'custom',name:`Capteur ${w.toFixed(2)} mm`,width:w};updateAll();renderPresets();$('#presetDialog').close()}
  };
  $('#objectWidth').oninput=calculateCalibration;
  $('#objectDistance').oninput=calculateCalibration;
  $('#saveCalibrationBtn').onclick=()=>{
    const f=calculateCalibration(); if(f){saveCalibration(f);$('#calDialog').close()}
  };
  $('#thirdsToggle').onchange=e=>$('#thirds').classList.toggle('hidden',!e.target.checked);
  $('#centerToggle').onchange=e=>$('#centerCross').classList.toggle('hidden',!e.target.checked);
  $('#resetCalBtn').onclick=()=>{resetCalibration();$('#settingsDialog').close()};

  addEventListener('resize',()=>{
    const next=innerWidth>=innerHeight?'landscape':'portrait';
    if(next!==state.orientation){state.orientation=next;loadCalibration()}
    updateFrame();
    updateProFrame();
  });
}
function openCalibrationChooser(){
  updateCalibrationStatus();
  $('#calChooserDialog').showModal();
}

function init(){
  renderLenses(); renderPresets(); renderRatios(); renderGuideChoices();
  renderProPresetSelect(); renderProLenses(); renderProPoints();
  setupCalibrationDrag(); registerEvents(); updateAll();
  if('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(()=>{});
}
init();
