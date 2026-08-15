const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

const presets = [
  // SONY — ordre volontaire demandé
  {id:'fx30', name:'Sony FX30', width:23.30, group:'SONY'},
  {id:'fx3', name:'Sony FX3', width:35.60, group:'SONY'},
  {id:'fx5', name:'Sony FX5', width:35.90, group:'SONY'},
  {id:'fx6', name:'Sony FX6', width:35.60, group:'SONY'},

  // ARRI / RED — du plus grand capteur au plus petit
  {id:'vraptor', name:'RED V-RAPTOR VV', width:40.96, group:'ARRI / RED'},
  {id:'miniLF', name:'ARRI ALEXA Mini LF', width:36.70, group:'ARRI / RED'},
  {id:'alexa35', name:'ARRI ALEXA 35', width:27.99, group:'ARRI / RED'},

  // GÉNÉRIQUE
  {id:'ff', name:'Full Frame 36 mm', width:36.00, group:'GÉNÉRIQUE'},
  {id:'s35', name:'Super 35', width:24.89, group:'GÉNÉRIQUE'},
  {id:'apsc', name:'APS-C', width:23.50, group:'GÉNÉRIQUE'},
  {id:'mft', name:'Micro 4/3', width:17.30, group:'GÉNÉRIQUE'},
  {id:'oneinch', name:'1 pouce', width:13.20, group:'GÉNÉRIQUE'}
];

const lenses = [14,18,21,24,25,28,32,35,40,50,65,70,75,85,100,105,135];
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
  preset:presets.find(p=>p.id==='alexa35') || presets[0],
  sensorWidth:(presets.find(p=>p.id==='alexa35') || presets[0]).width,
  focal:35,
  ratio:16/9,
  guides:new Set(),
  sourceFov:null,
  proPoints:[],
  proRefPreset:presets.find(p=>p.id==='fx6') || presets[0],
  proRefFocal:24,
  proScale:1,
  proOffsetX:0,
  proOffsetY:0,
  proAdvancedOpen:false,
  maxUsableHFov:null,
  maxUsableLimitLabel:null,
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
  if(data?.version === 5){
    state.sourceFov = data.quickHFov || null;
    state.proPoints = Array.isArray(data.proPoints) ? data.proPoints : [];
    state.maxUsableHFov = Number.isFinite(data.maxUsableHFov) ? data.maxUsableHFov : null;
    state.maxUsableLimitLabel = data.maxUsableLimitLabel || null;
  }else if(data?.version === 4){
    state.sourceFov = data.quickHFov || null;
    state.proPoints = Array.isArray(data.proPoints) ? data.proPoints : [];
    state.maxUsableHFov = null;
    state.maxUsableLimitLabel = null;
  }else if(data?.version === 3){
    state.sourceFov = data.quickHFov || null;
    state.proPoints = [];
    state.maxUsableHFov = null;
    state.maxUsableLimitLabel = null;
  }else if(data?.version === 2){
    state.sourceFov = data.hfov || null;
    state.proPoints = [];
    state.maxUsableHFov = null;
    state.maxUsableLimitLabel = null;
  }else{
    state.sourceFov = null;
    state.proPoints = [];
    state.maxUsableHFov = null;
    state.maxUsableLimitLabel = null;
  }
  state.proOffsetX=0;
  state.proOffsetY=0;
  updateCalibrationStatus();
  updateWideLimitUI();
  updateSimulation();
  renderProPoints();
  renderLenses();
}
function writeCalibrationProfile(){
  const all=calibrationStore();
  all[orientationKey()]={
    version:5,
    quickHFov:state.sourceFov || null,
    proPoints:state.proPoints,
    maxUsableHFov:state.maxUsableHFov,
    maxUsableLimitLabel:state.maxUsableLimitLabel,
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
  state.maxUsableHFov=null;
  state.maxUsableLimitLabel=null;
  updateCalibrationStatus();
  updateWideLimitUI();
  updateSimulation();
  renderProPoints();
}

function isTargetUnavailable(sensorWidth,focal){
  if(!Number.isFinite(state.maxUsableHFov)) return false;
  const hf=targetHFovFor(sensorWidth,focal);
  return hf > state.maxUsableHFov + 0.05;
}
function renderLenses(){
  const el=$('#lensStrip'); el.innerHTML='';
  lenses.forEach(mm=>{
    const unavailable=isTargetUnavailable(state.sensorWidth,mm);
    const b=document.createElement('button');
    b.className='lens-pill'+(mm===state.focal?' active':'')+(unavailable?' unavailable':'');
    b.textContent=mm;
    if(unavailable){
      b.disabled=true;
      b.title='Champ trop large pour la caméra téléphone calibrée';
    }else{
      b.onclick=()=>{state.focal=mm; renderLenses(); updateAll(); centerActiveLens();};
    }
    el.appendChild(b);
  });
  setTimeout(centerActiveLens,0);
}
function centerElementInsideStrip(strip,el,smooth=true){
  if(!strip || !el) return;
  const target=el.offsetLeft - (strip.clientWidth-el.offsetWidth)/2;
  strip.scrollTo({
    left:Math.max(0,target),
    behavior:smooth?'smooth':'auto'
  });
}
function centerActiveLens(){
  const strip=$('#lensStrip');
  const a=$('#lensStrip .lens-pill.active');
  centerElementInsideStrip(strip,a,true);
}
function renderPresets(){
  const el=$('#presetList'); el.innerHTML='';
  let currentGroup=null;

  presets.forEach(p=>{
    if(p.group!==currentGroup){
      currentGroup=p.group;
      const h=document.createElement('div');
      h.className='preset-group-title';
      h.textContent=currentGroup;
      el.appendChild(h);
    }

    const b=document.createElement('button');
    b.type='button';
    b.className='choice'+(state.preset.id===p.id?' active':'');
    b.innerHTML=`<strong>${p.name}</strong><small>largeur capteur de référence : ${p.width.toFixed(2)} mm</small>`;
    b.onclick=()=>{
      state.preset=p; state.sensorWidth=p.width;
      $('#sensorWidthInput').value=p.width.toFixed(2);
      if(isTargetUnavailable(state.sensorWidth,state.focal)){
        const first=lenses.find(mm=>!isTargetUnavailable(state.sensorWidth,mm));
        if(first) state.focal=first;
      }
      renderPresets(); renderLenses(); updateAll(); $('#presetDialog').close();
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
  const vf=$('#cameraStage') || $('.viewfinder');
  const maxW=vf.clientWidth*.92;
  const maxH=vf.clientHeight*.82;
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
function containedVideoMetrics(video){
  const sw=video.videoWidth, sh=video.videoHeight;
  const cw=video.clientWidth || 1, ch=video.clientHeight || 1;
  if(!sw || !sh) return {imageW:cw,imageH:ch,left:0,top:0};

  const sourceAspect=sw/sh;
  const boxAspect=cw/ch;
  let imageW,imageH,left,top;

  if(sourceAspect > boxAspect){
    imageW=cw;
    imageH=cw/sourceAspect;
    left=0;
    top=(ch-imageH)/2;
  }else{
    imageH=ch;
    imageW=ch*sourceAspect;
    top=0;
    left=(cw-imageW)/2;
  }
  return {imageW,imageH,left,top};
}

function effectiveDisplayedHFov(){
  return state.sourceFov;
}

function interpolateProCalibration(targetX){
  if(!state.proPoints.length) return null;
  const pts=[...state.proPoints].sort((a,b)=>a.x-b.x);
  const value=p=>({
    j:p.j,
    ox:Number.isFinite(p.ox)?p.ox:0,
    oy:Number.isFinite(p.oy)?p.oy:0
  });

  if(pts.length===1) return {...value(pts[0]),outside:true};

  if(targetX<=pts[0].x) return {...value(pts[0]),outside:true};
  if(targetX>=pts[pts.length-1].x) return {...value(pts[pts.length-1]),outside:true};

  for(let i=0;i<pts.length-1;i++){
    const a=pts[i], b=pts[i+1];
    if(targetX>=a.x && targetX<=b.x){
      const t=(targetX-a.x)/(b.x-a.x);
      return {
        j:a.j+(b.j-a.j)*t,
        ox:(Number.isFinite(a.ox)?a.ox:0)+((Number.isFinite(b.ox)?b.ox:0)-(Number.isFinite(a.ox)?a.ox:0))*t,
        oy:(Number.isFinite(a.oy)?a.oy:0)+((Number.isFinite(b.oy)?b.oy:0)-(Number.isFinite(a.oy)?a.oy:0))*t,
        outside:false
      };
    }
  }
  return {...value(pts[0]),outside:true};
}

function frameSafeMinScale(video,frame,ox=0,oy=0){
  const m=containedVideoMetrics(video);
  const fw=frame.clientWidth || 1;
  const fh=frame.clientHeight || 1;

  // Offset is normalized to frame dimensions.
  // Add the displacement to the required half-extent so the frame remains
  // completely covered by real camera pixels.
  const reqW=fw*(1+2*Math.abs(ox));
  const reqH=fh*(1+2*Math.abs(oy));
  return Math.max(reqW/(m.imageW||1),reqH/(m.imageH||1),0.05);
}

function setVideoTransform(video,frame,scale,ox=0,oy=0){
  const dx=ox*(frame.clientWidth||1);
  const dy=oy*(frame.clientHeight||1);
  video.style.transform=`translate3d(${dx.toFixed(2)}px,${dy.toFixed(2)}px,0) scale(${scale.toFixed(5)})`;
}

function updateSimulation(){
  const video=$('#video'), frame=$('#mainFrame'), warning=$('#simWarning');
  warning.classList.add('hidden'); warning.textContent='';

  const target=targetHFov();
  const targetX=Math.tan(rad(target)/2);

  if(Number.isFinite(state.maxUsableHFov) && target>state.maxUsableHFov+.05){
    setVideoTransform(video,frame,1,0,0);
    warning.textContent=`FOCALE NON DISPONIBLE · LIMITE ${state.maxUsableLimitLabel || state.maxUsableHFov.toFixed(1)+'°'}`;
    warning.classList.remove('hidden');
    return;
  }
  const metrics=containedVideoMetrics(video);
  const frameFraction=(frame.clientWidth||1)/(metrics.imageW||1);

  // CAL PRO is now a continuous curve of scale + optical centering.
  if(state.proPoints.length){
    const result=interpolateProCalibration(targetX);
    let scale=frameFraction*result.j/targetX;
    const safeMin=frameSafeMinScale(video,frame,result.ox,result.oy);

    if(scale<safeMin){
      scale=safeMin;
      warning.textContent='LIMITE GRAND-ANGLE DU TÉLÉPHONE · ESSAIE LA CAMÉRA ULTRA-GRAND-ANGLE';
      warning.classList.remove('hidden');
    }
    scale=Math.min(12,scale);
    setVideoTransform(video,frame,scale,result.ox,result.oy);

    if(result.outside && state.proPoints.length>=2 && warning.classList.contains('hidden')){
      const focals=state.proPoints.map(p=>p.focal).filter(Number.isFinite);
      if(focals.length){
        warning.textContent=`CAL PRO · HORS PLAGE ÉTALONNÉE ${Math.min(...focals)}–${Math.max(...focals)} mm`;
        warning.classList.remove('hidden');
      }
    }
    return;
  }

  // CAL RAPIDE fallback.
  if(!state.sourceFov){
    setVideoTransform(video,frame,1,0,0);
    if(state.stream){
      warning.textContent='CALIBRATION REQUISE';
      warning.classList.remove('hidden');
    }
    return;
  }

  const sourceTan=Math.tan(rad(state.sourceFov)/2);
  let scale=frameFraction*sourceTan/targetX;
  const safeMin=frameSafeMinScale(video,frame,0,0);

  if(scale<safeMin){
    scale=safeMin;
    warning.textContent='LIMITE GRAND-ANGLE DU TÉLÉPHONE · ESSAIE LA CAMÉRA ULTRA-GRAND-ANGLE';
    warning.classList.remove('hidden');
  }
  setVideoTransform(video,frame,Math.min(12,scale),0,0);
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

  const groups=[];
  presets.forEach(p=>{
    if(!groups.includes(p.group)) groups.push(p.group);
  });

  groups.forEach(groupName=>{
    const g=document.createElement('optgroup');
    g.label=groupName;
    presets.filter(p=>p.group===groupName).forEach(p=>{
      const o=document.createElement('option');
      o.value=p.id;
      o.textContent=p.name;
      o.selected=p.id===state.proRefPreset.id;
      g.appendChild(o);
    });
    sel.appendChild(g);
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
      if(window.scrollX) window.scrollTo(0,window.scrollY);
      renderProLenses();
      prepareProScale();
      updateProHUD();
    };
    el.appendChild(b);
  });
  setTimeout(()=>{
    const strip=$('#proLensStrip');
    const a=$('#proLensStrip .pro-lens.active');
    centerElementInsideStrip(strip,a,true);
  },0);
}
function proReferenceHFov(){
  return targetHFovFor(state.proRefPreset.width,state.proRefFocal);
}
function updateProHUD(){
  const hf=proReferenceHFov();
  $('#proTopReference').textContent=`${state.proRefPreset.name} · ${state.proRefFocal} mm`;
  if($('#proCompactRef')) $('#proCompactRef').textContent=`${state.proRefPreset.name} · ${state.proRefFocal} mm`;
  $('#proTargetFov').textContent=hf.toFixed(1)+'°';
  $('#proFrameLabel').textContent=ratioLabel(state.ratio);
  $('#proScaleReadout').textContent=state.proScale.toFixed(3)+'×';
  if($('#proOffsetXReadout')) $('#proOffsetXReadout').textContent=(state.proOffsetX*100).toFixed(1)+'%';
  if($('#proOffsetYReadout')) $('#proOffsetYReadout').textContent=(state.proOffsetY*100).toFixed(1)+'%';
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
  const v=$('#proVideo'), frame=$('#proFrame');
  state.proScale=Math.max(.35,Math.min(8,Number(state.proScale)||1));
  state.proOffsetX=Math.max(-.35,Math.min(.35,Number(state.proOffsetX)||0));
  state.proOffsetY=Math.max(-.35,Math.min(.35,Number(state.proOffsetY)||0));

  const safeMin=frameSafeMinScale(v,frame,state.proOffsetX,state.proOffsetY);
  const warn=$('#proWideWarning');
  if(state.proScale<=safeMin+.004){
    warn.classList.remove('hidden');
  }else{
    warn.classList.add('hidden');
  }

  $('#proScaleSlider').min=Math.max(.35,Math.min(2,safeMin)).toFixed(3);
  if(state.proScale<safeMin) state.proScale=safeMin;

  $('#proScaleSlider').value=state.proScale;
  $('#proOffsetXSlider').value=state.proOffsetX;
  $('#proOffsetYSlider').value=state.proOffsetY;
  $('#proScaleReadout').textContent=state.proScale.toFixed(3)+'×';
  $('#proOffsetXReadout').textContent=(state.proOffsetX*100).toFixed(1)+'%';
  $('#proOffsetYReadout').textContent=(state.proOffsetY*100).toFixed(1)+'%';

  setVideoTransform(v,frame,state.proScale,state.proOffsetX,state.proOffsetY);
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
  const metrics=containedVideoMetrics(video);
  const frameFraction=(frame.clientWidth||1)/(metrics.imageW||1);
  return frameFraction*point.j/targetX;
}
function quickEstimateForPro(){
  const video=$('#proVideo'), frame=$('#proFrame');
  const metrics=containedVideoMetrics(video);
  const frameFraction=(frame.clientWidth||1)/(metrics.imageW||1);
  if(!state.sourceFov) return Math.max(frameSafeMinScale(video,frame,0,0),1);
  const targetX=Math.tan(rad(proReferenceHFov())/2);
  const sourceTan=Math.tan(rad(state.sourceFov)/2);
  return Math.max(frameSafeMinScale(video,frame,0,0),frameFraction*sourceTan/targetX);
}
function prepareProScale(){
  updateProFrame();
  const existing=findExistingProPoint();

  if(existing){
    state.proScale=scaleFromProPoint(existing);
    state.proOffsetX=Number.isFinite(existing.ox)?existing.ox:0;
    state.proOffsetY=Number.isFinite(existing.oy)?existing.oy:0;
  }else if(state.proPoints.length){
    const targetX=Math.tan(rad(proReferenceHFov())/2);
    const res=interpolateProCalibration(targetX);
    const pseudo={j:res.j};
    state.proScale=scaleFromProPoint(pseudo);
    state.proOffsetX=res.ox;
    state.proOffsetY=res.oy;
  }else{
    state.proScale=quickEstimateForPro();
    state.proOffsetX=0;
    state.proOffsetY=0;
  }
  applyProScale();
  updateProHUD();
}
function saveCurrentProPoint(){
  const video=$('#proVideo'), frame=$('#proFrame');
  if(!video.videoWidth || !frame.clientWidth) return;
  const hfov=proReferenceHFov();
  const x=Math.tan(rad(hfov)/2);
  const metrics=containedVideoMetrics(video);
  const frameFraction=(frame.clientWidth||1)/(metrics.imageW||1);

  // Normalize zoom against the COMPLETE phone image.
  // Center offsets are stored as a fraction of the cinema frame.
  const j=state.proScale*x/frameFraction;

  saveProPoint({
    x,j,hfov,
    ox:state.proOffsetX,
    oy:state.proOffsetY,
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
    const cent=(Math.abs(p.ox||0)>.002 || Math.abs(p.oy||0)>.002) ? ` · centre ${(p.ox*100).toFixed(0)}/${(p.oy*100).toFixed(0)}` : '';
    row.innerHTML=`<div><strong>${p.focal} mm</strong><span>${p.presetName} · ${p.hfov.toFixed(1)}°${cent}</span></div><button type="button">×</button>`;
    row.querySelector('button').onclick=()=>{deleteProPoint(actualIndex);renderProLenses()};
    el.appendChild(row);
  });
}
function openProCalibration(){
  const go=()=>{
    window.scrollTo(0,0);
    $('#proVideo').srcObject=state.stream;
    renderProPresetSelect();
    renderProLenses();
    renderProPoints();
    updateWideLimitUI();
    $('#proCalDialog').showModal();
    state.proAdvancedOpen=false;
    $('#proControls').classList.remove('hidden');
    $('#showProControlsBtn').classList.add('hidden');
    setProAdvanced(false);
    requestAnimationFrame(()=>{updateProFrame();prepareProScale()});
  };
  if(!state.stream) startCamera().then(go); else go();
}
function openQuickCalibration(){
  const go=()=>{$('#calDialog').showModal();updateCalLines()};
  if(!state.stream) startCamera().then(go); else go();
}


function setProAdvanced(open){
  state.proAdvancedOpen=!!open;
  const panel=$('#proAdvancedPanel');
  const controls=$('#proControls');
  const btn=$('#toggleProAdvancedBtn');
  panel.classList.toggle('hidden',!state.proAdvancedOpen);
  controls.classList.toggle('expanded',state.proAdvancedOpen);
  btn.textContent=state.proAdvancedOpen?'FERMER':'RÉGLAGES';
  requestAnimationFrame(()=>updateProFrame());
}
function hideProControls(){
  $('#proControls').classList.add('hidden');
  $('#showProControlsBtn').classList.remove('hidden');
  requestAnimationFrame(()=>updateProFrame());
}
function showProControls(){
  $('#proControls').classList.remove('hidden');
  $('#showProControlsBtn').classList.add('hidden');
  requestAnimationFrame(()=>updateProFrame());
}


function updateWideLimitUI(){
  const status=$('#proLimitStatus');
  const details=$('#proLimitDetails');
  const clear=$('#clearWideLimitBtn');
  if(!status || !details || !clear) return;

  if(Number.isFinite(state.maxUsableHFov)){
    status.textContent=state.maxUsableLimitLabel || `${state.maxUsableHFov.toFixed(1)}° max`;
    details.textContent=`Tout cadrage demandant plus de ${state.maxUsableHFov.toFixed(1)}° horizontal sera désactivé.`;
    clear.classList.remove('hidden');
  }else{
    status.textContent='Aucune limite définie';
    details.textContent='Définis la focale la plus large que le téléphone arrive réellement à reproduire.';
    clear.classList.add('hidden');
  }
}
function setCurrentAsWideLimit(){
  const hf=proReferenceHFov();
  state.maxUsableHFov=hf;
  state.maxUsableLimitLabel=`${state.proRefPreset.name} · ${state.proRefFocal} mm`;
  writeCalibrationProfile();
  updateWideLimitUI();
  renderLenses();
  updateSimulation();
}
function clearWideLimit(){
  state.maxUsableHFov=null;
  state.maxUsableLimitLabel=null;
  writeCalibrationProfile();
  updateWideLimitUI();
  renderLenses();
  updateSimulation();
}


function preferredTheme(){
  return localStorage.getItem("bruno-set-tools-theme") || "light";
}
function applyTheme(theme,persist=true){
  const dark=theme==="dark";
  document.body.classList.toggle("dark",dark);
  document.body.dataset.theme=dark?"dark":"light";

  const themeToggle=$('#themeBtn');
  const themeColor=document.getElementById("themeColor") || document.querySelector('meta[name="theme-color"]');
  if(themeToggle) themeToggle.textContent=dark?"LIGHT":"DARK";
  if(themeColor) themeColor.setAttribute("content",dark?"#0B0C0E":"#F3F1EC");

  if(persist) localStorage.setItem("bruno-set-tools-theme",dark?"dark":"light");
}
function toggleTheme(){
  applyTheme(document.body.classList.contains("dark")?"light":"dark");
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
  $('#toggleProAdvancedBtn').onclick=()=>setProAdvanced(!state.proAdvancedOpen);
  $('#hideProControlsBtn').onclick=()=>hideProControls();
  $('#showProControlsBtn').onclick=()=>showProControls();
  $('#proOffsetXSlider').oninput=e=>{state.proOffsetX=parseFloat(e.target.value);applyProScale()};
  $('#proOffsetYSlider').oninput=e=>{state.proOffsetY=parseFloat(e.target.value);applyProScale()};
  $('#resetProCenterBtn').onclick=()=>{state.proOffsetX=0;state.proOffsetY=0;applyProScale()};
  $('#setWideLimitBtn').onclick=()=>setCurrentAsWideLimit();
  $('#clearWideLimitBtn').onclick=()=>clearWideLimit();
  $('#saveProPointBtn').onclick=()=>saveCurrentProPoint();

  $('#settingsBtn').onclick=()=>$('#settingsDialog').showModal();
  $('#themeBtn').onclick=()=>toggleTheme();
  $('#cameraPresetBtn').onclick=()=>{$('#sensorWidthInput').value=state.sensorWidth.toFixed(2);$('#presetDialog').showModal()};
  $('#ratioBtn').onclick=()=>$('#ratioDialog').showModal();
  $('#applySensorBtn').onclick=()=>{
    const w=parseFloat($('#sensorWidthInput').value);
    if(w>5&&w<70){
      state.sensorWidth=w;
      state.preset={id:'custom',name:`Capteur ${w.toFixed(2)} mm`,width:w};
      if(isTargetUnavailable(state.sensorWidth,state.focal)){
        const first=lenses.find(mm=>!isTargetUnavailable(state.sensorWidth,mm));
        if(first) state.focal=first;
      }
      renderLenses(); updateAll(); renderPresets(); $('#presetDialog').close()
    }
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
  applyTheme(preferredTheme(),false);
  renderLenses(); renderPresets(); renderRatios(); renderGuideChoices();
  renderProPresetSelect(); renderProLenses(); renderProPoints();
  setupCalibrationDrag(); registerEvents(); updateAll();
  if('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(()=>{});
}
init();
