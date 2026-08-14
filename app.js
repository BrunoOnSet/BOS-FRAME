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
  state.sourceFov = data?.hfov || null;
  updateCalibrationStatus();
  updateSimulation();
}
function saveCalibration(hfov){
  const all=calibrationStore();
  all[orientationKey()]={hfov, savedAt:new Date().toISOString()};
  localStorage.setItem('frame-calibrations',JSON.stringify(all));
  state.sourceFov=hfov;
  updateCalibrationStatus();
  updateSimulation();
}
function resetCalibration(){
  const all=calibrationStore();
  delete all[orientationKey()];
  localStorage.setItem('frame-calibrations',JSON.stringify(all));
  state.sourceFov=null;
  updateCalibrationStatus();
  updateSimulation();
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
function updateSimulation(){
  const video=$('#video'), warning=$('#simWarning');
  warning.classList.add('hidden'); warning.textContent='';
  if(!state.sourceFov){
    video.style.transform='scale(1)';
    if(state.stream){warning.textContent='CALIBRATION REQUISE POUR SIMULER LA FOCALE';warning.classList.remove('hidden')}
    return;
  }
  const target=targetHFov(), source=state.sourceFov;
  if(target >= source-.2){
    video.style.transform='scale(1)';
    if(target>source+.5){
      warning.textContent=`OBJECTIF TÉLÉPHONE TROP SERRÉ · ${source.toFixed(1)}° dispo / ${target.toFixed(1)}° demandé`;
      warning.classList.remove('hidden');
    }
    return;
  }
  const fraction=Math.tan(rad(target)/2)/Math.tan(rad(source)/2);
  const scale=Math.max(1,1/fraction);
  video.style.transform=`scale(${scale.toFixed(4)})`;
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
  if(state.sourceFov){
    s.textContent='Calibrée ✓';
    d.textContent=`Champ horizontal visible : ${state.sourceFov.toFixed(2)}° · ${state.orientation}`;
  }else{
    s.textContent='Non calibrée';
    d.textContent=`Calibration nécessaire en orientation ${state.orientation}.`;
  }
}

function setupCalibrationDrag(){
  const preview=$('#calPreview');
  const attach=(el,key)=>{
    const move=(clientX)=>{
      const r=preview.getBoundingClientRect();
      let x=Math.max(0.06,Math.min(.94,(clientX-r.left)/r.width));
      if(key==='calLeft') x=Math.min(x,state.calRight-.05);
      else x=Math.max(x,state.calLeft+.05);
      state[key]=x; updateCalLines();
    };
    el.addEventListener('pointerdown',e=>{el.setPointerCapture(e.pointerId); move(e.clientX)});
    el.addEventListener('pointermove',e=>{if(el.hasPointerCapture(e.pointerId))move(e.clientX)});
  };
  attach($('#calLeft'),'calLeft'); attach($('#calRight'),'calRight');
}
function updateCalLines(){
  $('#calLeft').style.left=(state.calLeft*100)+'%';
  $('#calRight').style.left=(state.calRight*100)+'%';
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

function registerEvents(){
  $('#startCameraBtn').onclick=()=>startCamera();
  $('#cameraBtn').onclick=()=>{$('#cameraDialog').showModal();updateCalibrationStatus()};
  $('#restartCameraBtn').onclick=()=>startCamera($('#deviceSelect').value);
  $('#calBtn').onclick=()=>openCalibration();
  $('#openCalFromCamera').onclick=()=>{$('#cameraDialog').close();openCalibration()};
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
  });
}
function openCalibration(){
  if(!state.stream){ startCamera().then(()=>{$('#calDialog').showModal();updateCalLines()}); }
  else{$('#calDialog').showModal();updateCalLines()}
}

function init(){
  renderLenses(); renderPresets(); renderRatios(); renderGuideChoices(); setupCalibrationDrag(); registerEvents(); updateAll();
  if('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(()=>{});
}
init();
