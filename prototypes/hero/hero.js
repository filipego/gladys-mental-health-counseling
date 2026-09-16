// Throwaway study: three hero options.
const variants = [
  {id:'1',name:'Making room for change',file:'brain-organic.png',kind:'collage',alt:'Curved photo fragments of families and individuals form an open brain-shaped collage.',note:'Brain collage'},
  {id:'2',name:'From tangled to understood',file:'inner-landscape.png',kind:'sculpture',alt:'A translucent rose-colored head with tangled threads opening into delicate branches.',note:'Translucent sculptural head'},
  {id:'3',name:'Quiet signals',file:'inner-landscape.png',kind:'sculpture neural',alt:'A still translucent portrait with slowly changing warm neural signals.',note:'Neural crossfade · 6.5-second loop'}
];
const neuralSources=['inner-landscape.png','neural-1.png','neural-2.png','neural-3.png','neural-4.png'];
let neuralReady;
function preloadNeural(){
  return neuralReady ??= Promise.all(neuralSources.map(file=>{const img=new Image();img.src=`assets/${file}`;return img.decode();}));
}
function art(v,context){
  if(v.id==='3' && context==='main')return `<div class="neural-stack"><img class="neural-base" src="assets/inner-landscape.png" alt="${v.alt}">${neuralSources.slice(1).map((file,i)=>`<img class="neural-frame neural-${i+1}" src="assets/${file}" alt="" aria-hidden="true">`).join('')}</div>`;
  return `<img src="assets/${v.file}" alt="${v.alt}" decoding="async">`;}
const params=new URLSearchParams(location.search);
let current=Math.max(0,variants.findIndex(v=>v.id===params.get('variant')));
const artwork=document.getElementById('artwork');
const dots=document.getElementById('dots');
variants.forEach((v,i)=>{const b=document.createElement('button');b.textContent=v.id;b.setAttribute('aria-label',`${v.id}: ${v.name}`);b.onclick=()=>show(i);dots.append(b)});
function show(i){
  current=(i+variants.length)%variants.length;
  const v=variants[current];
  artwork.className=`artwork ${v.kind}`;artwork.innerHTML=art(v,'main');
  if(v.id==='3'){const stack=artwork.querySelector('.neural-stack');preloadNeural().then(()=>{if(stack.isConnected)stack.classList.add('ready');}).catch(()=>{});}
  document.getElementById('variant-title').textContent=`${v.id} · ${v.name}`;
  document.getElementById('variant-note').textContent=v.note;
  [...dots.children].forEach((b,j)=>b.setAttribute('aria-current',String(j===current)));
  params.set('variant',v.id);history.replaceState(null,'',`${location.pathname}?${params}`);
  document.title=`Hero ${v.id} · ${v.name} · Gladys Henriquez`;
}
document.getElementById('prev').onclick=()=>show(current-1);
document.getElementById('next').onclick=()=>show(current+1);
document.addEventListener('keydown',e=>{if(document.getElementById('comparison').open||e.target.matches('input,textarea,select,[contenteditable=true]'))return;if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();show(current+(e.key==='ArrowRight'?1:-1))}});
const comparison=document.getElementById('comparison');
const grid=document.getElementById('comparison-grid');
variants.forEach((v,i)=>{const b=document.createElement('button');b.className='option';b.innerHTML=`<div class="thumb">${art(v,'thumb')}</div><strong>${v.id}. ${v.name}</strong><p>${v.note}</p>`;b.onclick=()=>{show(i);comparison.close()};grid.append(b)});
document.getElementById('overview').onclick=()=>{comparison.showModal();document.getElementById('overview').setAttribute('aria-expanded','true')};
document.getElementById('close-comparison').onclick=()=>comparison.close();
comparison.addEventListener('close',()=>document.getElementById('overview').setAttribute('aria-expanded','false'));
show(current);
