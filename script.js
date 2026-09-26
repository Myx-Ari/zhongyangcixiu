const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const places={'窑洞':{x:11.7,y:27,group:'俗韵'},'莜面栲栳栳':{x:12.7,y:61.5,group:'俗韵'},'九曲灯阵':{x:63.2,y:83,group:'俗韵'},'闹红火':{x:76.4,y:76,group:'俗韵'},'中阳剪纸':{x:94.2,y:81,group:'俗韵'},'山地农耕':{x:18.6,y:18.5,group:'俗韵'},'南川河':{x:19.9,y:55,group:'风物'},'中阳龙山公园':{x:37.8,y:19,group:'风物'},'凤凰阁':{x:56.7,y:17,group:'风物'},'烈士楼':{x:47.8,y:63,group:'风物'},'梯田':{x:31.2,y:35,group:'风物'}};
const detailHeroes={
  '窑洞':'窑洞.jpg','莜面栲栳栳':'莜面栲栳栳.jpg','闹红火':'闹红火.jpg','九曲灯阵':'九曲灯阵.jpg','山地农耕':'山地农耕.jpg','中阳剪纸':'中阳剪纸.jpg',
  '南川河':'南川河.jpg','烈士楼':'烈士楼.jpg','中阳龙山公园':'中阳龙山公园.jpg','凤凰阁':'凤凰阁.jpg','梯田':'梯田.jpg'
};
const stitchRegions={
  '套针':{brief:'套针包含单套、双套、散套、集套、木梳套、扁毛套六种变化。',areas:[{name:'山地农耕',x:18.6,y:18.5},{name:'凤凰阁',x:56.7,y:17},{name:'中阳龙山公园',x:37.8,y:19}],notes:[
    {title:'木梳套',text:'针距稀疏隔针相套，如草地上的小花。',x:6.4,y:56.4,align:'left'},
    {title:'单套',text:'第一批沿轮廓起针，后批插入前批缝隙，针脚较长，如山势线条、深咖边框。',x:25.9,y:49.1},
    {title:'双套',text:'套得更深、针脚短密，转折灵活，晕色细腻，如大树。',x:38.5,y:23.6},
    {title:'扁毛套',text:'顺着凤凰羽毛走势走针。',x:52.7,y:37.5},
    {title:'散套',text:'外缘整齐，内部线条长短参差，批批相叠，针针相嵌，如马路、大山。',x:60.0,y:46.2},
    {title:'集套',text:'全部针迹朝向圆心，越靠近圆心藏短针，如太阳。',x:76.4,y:18.9}
  ]},
  '平针':{brief:'直针（也可叫齐针）：最基础针法，线条平行整齐，起落针都在纹样边缘，分竖直针、横直针、斜平针。\n铺针：长直针铺满底层，上面再叠加其他颜色。\n长短针：长短针交错参差，针脚互相穿插，色彩过渡柔和。',areas:[{name:'中阳龙山公园',x:37.8,y:19},{name:'凤凰阁',x:56.7,y:17},{name:'烈士楼',x:47.8,y:63},{name:'窑洞',x:11.7,y:27}]},
  '打籽针':{brief:'线在针上绕圈打结，绣成一粒粒凸起的颗粒，为平面绣品增加浮雕层次感，为北方刺绣特色技法。',areas:[{name:'中阳剪纸',x:94.2,y:81},{name:'闹红火',x:76.4,y:76}]},
  '刻鳞针':{brief:'针脚叠出鳞片纹理。',areas:[{name:'南川河',x:19.9,y:55},{name:'中阳剪纸',x:94.2,y:81},{name:'凤凰阁',x:56.7,y:17}]},
  '滚针':{brief:'线条圆顺连贯，针脚前后相压，如灯笼分割线条。',areas:[{name:'南川河',x:19.9,y:55}]},
  '正抢针':{brief:'由外向内分层抢色，一层层顺向排布针脚，色块整齐，如：水纹。',areas:[{name:'山地农耕',x:18.6,y:18.5},{name:'梯田',x:31.2,y:35},{name:'烈士楼',x:47.8,y:63}]},
  '扎针':{brief:'也叫钉针，以小针脚固定长线，起固定作用，如：分割玉米粒。',areas:[{name:'窑洞',x:11.7,y:27},{name:'烈士楼',x:47.8,y:63}]},
  '网绣':{brief:'丝线交错绣制，形成蛛网纹样，如鱼身体。',areas:[{name:'南川河',x:19.9,y:55},{name:'窑洞',x:11.7,y:27}]},
  '编织绣':{brief:'经纬丝线互相交织，如同编织一样，如手拿的扇子。',areas:[{name:'窑洞',x:11.7,y:27},{name:'中阳龙山公园',x:37.8,y:19},{name:'烈士楼',x:47.8,y:63}]},
  '锁链针':{brief:'针脚连成锁链状，如镲子。',areas:[{name:'凤凰阁',x:56.7,y:17},{name:'闹红火',x:76.4,y:76},{name:'中阳剪纸',x:94.2,y:81}]}
};
const groups={俗韵:['窑洞','莜面栲栳栳','九曲灯阵','闹红火','中阳剪纸','山地农耕'],风物:['南川河','中阳龙山公园','凤凰阁','烈士楼','梯田'],绣工:['套针','平针','打籽针','刻鳞针','滚针','正抢针','扎针','网绣','编织绣','锁链针']};
const landscapePlaces=[...groups.俗韵,...groups.风物];
const stitchPages={};
['套针','打籽针','刻鳞针','滚针','正抢针','扎针','编织绣','网绣','锁链针','平针'].forEach(n=>{stitchPages[n]={art:`assets/figma/stitch-${n}.png`,exclude:`assets/figma/stitch-${n}-exclude.png`}});
const stitchHomePoints=[
 {name:'套针',label:'木梳套',x:8.36,y:86.03},{name:'套针',label:'单套',x:22.32,y:40.30},{name:'套针',label:'双套',x:49.21,y:14.09},{name:'套针',label:'扁毛套',x:52.14,y:27.23},{name:'套针',label:'散套',x:67.65,y:38.95},{name:'套针',label:'集套',x:71.89,y:10.96},
 {name:'平针',label:'直针',x:90.70,y:36.36},{name:'平针',label:'铺针',x:75.51,y:55.95},{name:'平针',label:'铺针',x:20.64,y:25.67},{name:'平针',label:'长短针',x:7.02,y:61.40},{name:'打籽针',label:'打籽针',x:32.82,y:31.44},{name:'扎针',label:'扎针',x:31.67,y:19.00},{name:'刻鳞针',label:'刻鳞针',x:21.10,y:62.92},{name:'滚针',label:'滚针',x:62.00,y:79.83},{name:'正抢针',label:'正抢针',x:42.42,y:79.83},{name:'网绣',label:'网绣',x:18.59,y:64.18},{name:'编织绣',label:'编织绣',x:69.63,y:80.28},{name:'锁链针',label:'锁链针',x:86.10,y:76.34}
];
const fallback={'莜面栲栳栳':'莜面栲栳栳是吕梁山区世代相传的传统粗粮面食，开水和面、手掌推片、指尖卷筒，形如蜂巢。刺绣中人们围坐一起制作栲栳栳的场景，绣出了山西人独有的乡愁。','闹红火':'锣鼓喧天，秧歌正欢，刺绣定格了中阳正月十五“闹红火”的盛况。','南川河':'南川河穿城而过，是长卷的叙事主线。层层水纹连接村落、田园与城市，也串联起中阳人的共同记忆。','套针':'套针以长短针脚层层衔接，后批针脚插入前批针脚之间，使色彩自然过渡、轮廓丰润，是表现花叶与动物的重要绣法。'};
const detailCopy={default:[['文化记忆','刺绣不只是图案，也是地方生活的档案。绣娘以针线记录山川、物产、节令与人情，让一幅长卷成为可以阅读的家园。'],['画卷中的形象','图像取自作品中的具体局部。不同色线沿轮廓铺陈，形成鲜明、质朴而富有生命力的民间艺术语言。']]};
let tab='俗韵',current='',scale=1,tx=0,ty=0,drag=false,startX=0,startY=0,entriesRenderId=0;const stage=$('#stage'),paperCut=$('#paperCut'),data=window.contentData||{};const wait=ms=>new Promise(r=>setTimeout(r,ms));if('scrollRestoration' in history)history.scrollRestoration='manual';scrollTo(0,0);setTimeout(()=>scrollTo(0,0),120);
$('#stitchArt').onload=()=>{applyStitchPins();applyStitchNotes()};
function show(id){$$('.view').forEach(v=>v.classList.toggle('is-hidden',v.id!==id));const introMode=id==='intro';document.body.classList.toggle('intro-mode',introMode);document.body.classList.toggle('stitch-mode',introMode&&tab==='绣工');document.body.classList.toggle('stitch-notes-mode',introMode&&tab==='绣工'&&current==='套针');if(introMode){$('#home').classList.remove('is-hidden');const p=places[current]||{};$('#intro').classList.toggle('focus-right',(p.x||35)>58);$('#intro').classList.toggle('focus-low',(p.y||40)>60)}if(id!=='intro')paperCut.classList.remove('active');if(id==='home'){current='';renderEntries()}if(introMode&&current&&tab!=='绣工'){paperCut.classList.add('active');renderEntries()}}
function renderPins(){const box=$('#pins');box.innerHTML='';if(tab==='绣工'){stitchHomePoints.forEach((point,index)=>{const b=document.createElement('button');b.className='pin stitch-home-pin';b.title=`${point.name} · ${point.label}`;b.dataset.group='绣工';b.style.left=point.x+'%';b.style.top=point.y+'%';b.style.setProperty('--pin-delay',`${index*90}ms`);b.addEventListener('pointerdown',e=>{e.stopPropagation();b.setPointerCapture?.(e.pointerId)});b.addEventListener('pointerup',e=>e.stopPropagation());b.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();startIntroTransition(point.name)});box.appendChild(b)});return}landscapePlaces.forEach(name=>{const p=places[name],b=document.createElement('button');b.className='pin';b.classList.toggle('cross-group',p.group!==tab);b.title=name;b.dataset.group=p.group;b.style.left=p.x+'%';b.style.top=p.y+'%';b.addEventListener('pointerdown',e=>{e.stopPropagation();b.setPointerCapture?.(e.pointerId)});b.addEventListener('pointerup',e=>e.stopPropagation());b.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();navigatePlace(name)});box.appendChild(b)})}
function navigatePlace(name){const targetGroup=places[name]?.group;if(tab!==targetGroup){setTab(targetGroup);const token=stitchTransitionId;setTimeout(()=>{if(token!==stitchTransitionId||tab!==targetGroup)return;startIntroTransition(name)},230)}else startIntroTransition(name)}
function renderEntries(group=tab,animate=true){const box=$('#entries'),renderId=++entriesRenderId,reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;const mount=()=>{if(renderId!==entriesRenderId)return;box.innerHTML='';groups[group].forEach((name,index)=>{const b=document.createElement('button');const isStitch=group==='绣工';if(isStitch){b.className='stitch-entry';b.classList.toggle('active',name===current);b.textContent=name}else{b.className='image-entry';b.classList.toggle('active',name===current);b.innerHTML=`<img src="assets/figma/${name}.png" alt="${name}">`}b.title=name;b.onclick=()=>{if(b.classList.contains('stitch-entry')){startIntroTransition(name);return}$$('.image-entry').forEach(x=>x.classList.remove('active'));b.classList.add('active');startIntroTransition(name)};b.style.setProperty('--entry-index',index);box.appendChild(b)});box.classList.remove('entries-leaving');box.classList.toggle('entries-entering',animate&&!reduced);if(animate&&!reduced)setTimeout(()=>{if(renderId===entriesRenderId)box.classList.remove('entries-entering')},560)};const hasOld=box.children.length>0;if(animate&&hasOld&&!reduced){box.classList.remove('entries-entering');box.classList.add('entries-leaving');setTimeout(mount,190)}else mount()}
function setTab(name){const leavingStitch=document.body.classList.contains('stitch-mode')&&name!=='绣工',changed=tab!==name;tab=name;if(leavingStitch)show('home');const tabs=$('#tabs');tabs.dataset.active=name;$$('#tabs button').forEach(b=>b.classList.toggle('active',b.dataset.tab===name));renderPins();renderEntries(name,changed)}
function getBrief(name){return data[name]?.brief||stitchRegions[name]?.brief||fallback[name]||`${name}是《家园》刺绣长卷中的重要内容。它以质朴鲜明的民间造型，记录中阳的自然风物、生活习俗与手工技艺。`}
function getFocus(name){return tab==='绣工'?(stitchRegions[name]?.areas?.[0]||{x:40,y:40}):(places[name]||{x:40,y:40})}
function renderStitchNotes(name){const box=$('#stitchNotes');if(!box)return;box.innerHTML='';(stitchRegions[name]?.notes||[]).forEach(n=>{const el=document.createElement('article');el.className='stitch-note';el.dataset.x=n.x;el.dataset.y=n.y;el.classList.toggle('align-left',n.align==='left');el.innerHTML=`<h3>${n.title}</h3><p>${n.text}</p>`;box.appendChild(el)});applyStitchNotes()}
function renderStitchPins(name){const box=$('#stitchPins');if(!box)return;box.innerHTML='';(stitchRegions[name]?.areas||[]).forEach((a,index)=>{const b=document.createElement('button');b.className='stitch-pin';b.title=a.name;b.dataset.x=a.x;b.dataset.y=a.y;b.classList.toggle('active',index===0);b.onclick=e=>{e.stopPropagation();focusStitchPoint(a)};box.appendChild(b)});requestAnimationFrame(applyStitchPins)}
function applyStitchPins(){const box=$('#stitchPins'),art=$('#stitchArt');if(!box||!art)return;const h=innerHeight,w=h*((art.naturalWidth||3648)/(art.naturalHeight||885));box.querySelectorAll('.stitch-pin').forEach(b=>{b.style.left=(tx+w*scale*Number(b.dataset.x)/100)+'px';b.style.top=(ty+h*scale*Number(b.dataset.y)/100)+'px'})}
function focusStitchPoint(point){const art=$('#stitchArt'),h=innerHeight,w=h*((art.naturalWidth||3648)/(art.naturalHeight||885));const nx=innerWidth*.5-(tx+w*scale*point.x/100),ny=innerHeight*.44-(ty+h*scale*point.y/100);panTo(nx,ny);$$('.stitch-pin').forEach(b=>b.classList.toggle('active',Number(b.dataset.x)===point.x&&Number(b.dataset.y)===point.y))}
function applyStitchNotes(){const box=$('#stitchNotes'),art=$('#stitchArt');if(!box||!art)return;const h=innerHeight,w=h*((art.naturalWidth||3648)/(art.naturalHeight||885));box.querySelectorAll('.stitch-note').forEach(el=>{el.style.left=(tx+w*scale*Number(el.dataset.x)/100)+'px';el.style.top=(ty+h*scale*Number(el.dataset.y)/100)+'px'})}
function openIntro(name){current=name;const focus=getFocus(name);show('intro');$('#intro').classList.toggle('focus-right',focus.x>58);$('#intro').classList.toggle('focus-low',focus.y>60);$('#introTitle').textContent=name;$('#introText').textContent=getBrief(name);const focusImage=$('#focusImage');if(focusImage)focusImage.style.setProperty('--focus-x',focus.x+'%');const sw=$('#stitchSwitch');if(tab==='绣工'){document.body.classList.add('stitch-mode');sw.style.display='';renderStitchNotes(name);renderStitchPins(name);if(!sw.children.length)groups.绣工.forEach(n=>{const b=document.createElement('button');b.textContent=n;b.onclick=()=>startIntroTransition(n);sw.appendChild(b)});$$('#stitchSwitch button').forEach(b=>b.classList.toggle('active',b.textContent===name));}else{document.body.classList.remove('stitch-mode','stitch-notes-mode');sw.style.display='none';sw.innerHTML='';$('#stitchExclude').style.display='';}}
function prepareFocus(){const p=places[current];if(!p)return;paperCut.style.setProperty('--hole-x',p.x+'%');paperCut.style.setProperty('--hole-y',p.y+'%');paperCut.style.setProperty('--hole-rx','860px');paperCut.style.setProperty('--hole-ry','860px')}
async function startIntroTransition(name){if(tab==='绣工'){openIntro(name);return}current=name;const p=places[name];if(!p){openIntro(name);return}const px=tx+stage.offsetWidth*scale*p.x/100,py=ty+stage.offsetHeight*scale*p.y/100,sx=[innerWidth*.25,innerWidth*.75],sy=[innerHeight*.2,innerHeight*.8];if(px<sx[0]||px>sx[1]||py<sy[0]||py>sy[1]){tx+=innerWidth*.5-px;ty+=innerHeight*.46-py;applyTransform();await wait(380)}prepareFocus();paperCut.classList.add('active');await wait(30);const start=performance.now(),dur=900;function frame(now){const t=Math.min(1,(now-start)/dur),e=1-Math.pow(1-t,3);paperCut.style.setProperty('--hole-rx',(42-24*e)+'%');paperCut.style.setProperty('--hole-ry',(58-30*e)+'%');if(t<1)requestAnimationFrame(frame)}requestAnimationFrame(frame);await wait(dur+80);paperCut.classList.remove('active');openIntro(name)}
 function openDetail(){show('detail');const hero=$('#detailHero'),heroFile=detailHeroes[current];hero.style.backgroundImage='none';hero.style.backgroundPosition='center';hero.classList.toggle('is-missing',!heroFile);hero.parentElement.classList.toggle('is-missing',!heroFile);if(heroFile)hero.style.backgroundImage=`url("assets/detail-hero/${encodeURIComponent(heroFile)}")`;const d=data[current]?.deep;if(d?.length){$('#detailTitle').textContent='';$('#detailLead').textContent='';$('#detailTitle').style.display='none';$('#detailLead').style.display='none';$('#detailSections').innerHTML=d.map(i=>{const heading=i.level==='大标题'?`<h2>${i.title}</h2>`:`<h3>${i.title}</h3>`;const media=i.image?`<img class="section-image" src="assets/deep/${encodeURIComponent(i.image)}" alt="${i.title}">`:'';return `<section>${heading}<p>${i.text}</p>${media}</section>`}).join('')}else{$('#detailTitle').style.display='block';$('#detailLead').style.display='block';$('#detailTitle').textContent=current;$('#detailLead').textContent=getBrief(current);$('#detailSections').innerHTML=detailCopy.default.map(([h,p])=>`<section><h2>${h}</h2><p>${p}</p></section>`).join('')}}
function applyTransform(){scale=Math.max(1,scale);const minX=Math.min(0,innerWidth-stage.offsetWidth*scale),minY=Math.min(0,innerHeight-stage.offsetHeight*scale);tx=Math.max(minX,Math.min(0,tx));ty=Math.max(minY,Math.min(0,ty));const transform=`translate(${tx}px,${ty}px) scale(${scale})`;stage.style.transform=transform;paperCut.style.transform=transform;const scene=$('#stitchScene');if(scene)scene.style.transform=transform;applyStitchNotes();applyStitchPins();$('#zoomText').textContent=Math.round(scale*100)+'%'}
function zoom(delta,cx=innerWidth/2,cy=innerHeight/2){const old=scale;scale=Math.max(.72,Math.min(2,scale+delta));tx=cx-(cx-tx)*(scale/old);ty=cy-(cy-ty)*(scale/old);applyTransform()}
$$('#tabs button').forEach(b=>b.onclick=()=>setTab(b.dataset.tab));
$('#zoomIn').onclick=()=>zoom(.12);$('#zoomOut').onclick=()=>zoom(-.12);$('#reset').onclick=()=>{scale=1;tx=ty=0;applyTransform()};$('#workInfo').onclick=()=>show('information');$('#more').onclick=openDetail;$('#backIntro').onclick=()=>show('home');$$('[data-home]').forEach(b=>b.onclick=()=>{if(document.body.classList.contains('stitch-mode')){tab='俗韵';$('#tabs').dataset.active='俗韵';$$('#tabs button').forEach(x=>x.classList.toggle('active',x.dataset.tab==='俗韵'));renderPins();}show('home')});
stage.addEventListener('wheel',e=>{e.preventDefault();if(e.altKey)zoom(e.deltaY<0?.1:-.1,e.clientX,e.clientY);else{tx-=e.deltaX;ty-=e.deltaY;applyTransform()}},{passive:false});let touches=new Map(),pinchStart=0,pinchScale=1;stage.onpointerdown=e=>{touches.set(e.pointerId,e);if(touches.size===1){drag=true;startX=e.clientX-tx;startY=e.clientY-ty;stage.classList.add('dragging')}if(touches.size===2){drag=false;const a=[...touches.values()];pinchStart=Math.hypot(a[0].clientX-a[1].clientX,a[0].clientY-a[1].clientY);pinchScale=scale}stage.setPointerCapture(e.pointerId)};stage.onpointermove=e=>{if(!touches.has(e.pointerId))return;touches.set(e.pointerId,e);if(touches.size===2){const a=[...touches.values()];scale=Math.max(1,Math.min(2,pinchScale*Math.hypot(a[0].clientX-a[1].clientX,a[0].clientY-a[1].clientY)/pinchStart));applyTransform()}else if(drag){tx=e.clientX-startX;ty=e.clientY-startY;applyTransform()}};stage.onpointerup=stage.onpointercancel=e=>{touches.delete(e.pointerId);if(!touches.size){drag=false;stage.classList.remove('dragging')}};addEventListener('resize',applyTransform);setTimeout(()=>$('.gesture-tip').style.opacity=0,3500);setTab('俗韵');applyTransform();
const stitchScene=$('#stitchScene');
if(stitchScene){
  const sceneTouches=new Map();let sceneDrag=false,sceneStartX=0,sceneStartY=0,scenePinchStart=0,scenePinchScale=1;
  let sceneMouseDrag=false,sceneMouseStartX=0,sceneMouseStartY=0;
  stitchScene.addEventListener('wheel',e=>{
    if(!document.body.classList.contains('stitch-mode'))return;
    e.preventDefault();
    if(Math.abs(e.deltaY)>0)zoom(e.deltaY<0?.1:-.1,e.clientX,e.clientY);
    else{tx-=e.deltaX;ty-=e.deltaY;applyTransform()}
  },{passive:false});
  stitchScene.addEventListener('pointerdown',e=>{
    if(!document.body.classList.contains('stitch-mode'))return;
    e.preventDefault();
    sceneTouches.set(e.pointerId,e);
    if(sceneTouches.size===1){sceneDrag=true;sceneStartX=e.clientX-tx;sceneStartY=e.clientY-ty;stitchScene.classList.add('dragging')}
    if(sceneTouches.size===2){sceneDrag=false;const a=[...sceneTouches.values()];scenePinchStart=Math.hypot(a[0].clientX-a[1].clientX,a[0].clientY-a[1].clientY);scenePinchScale=scale}
    stitchScene.setPointerCapture?.(e.pointerId);
  });
  stitchScene.addEventListener('pointermove',e=>{
    if(!sceneTouches.has(e.pointerId))return;
    sceneTouches.set(e.pointerId,e);
    if(sceneTouches.size===2){const a=[...sceneTouches.values()];scale=Math.max(1,Math.min(2,scenePinchScale*Math.hypot(a[0].clientX-a[1].clientX,a[0].clientY-a[1].clientY)/scenePinchStart));applyTransform()}
    else if(sceneDrag){tx=e.clientX-sceneStartX;ty=e.clientY-sceneStartY;applyTransform()}
  });
  const endScenePointer=e=>{sceneTouches.delete(e.pointerId);try{stitchScene.releasePointerCapture?.(e.pointerId)}catch{}if(!sceneTouches.size){sceneDrag=false;stitchScene.classList.remove('dragging')}};
  stitchScene.addEventListener('pointerup',endScenePointer);stitchScene.addEventListener('pointercancel',endScenePointer);
  stitchScene.addEventListener('mousedown',e=>{if(!document.body.classList.contains('stitch-mode'))return;sceneMouseDrag=true;sceneMouseStartX=e.clientX-tx;sceneMouseStartY=e.clientY-ty;stitchScene.classList.add('dragging');e.preventDefault()});
  addEventListener('mousemove',e=>{if(!sceneMouseDrag)return;tx=e.clientX-sceneMouseStartX;ty=e.clientY-sceneMouseStartY;applyTransform()});
  addEventListener('mouseup',()=>{if(sceneMouseDrag){sceneMouseDrag=false;stitchScene.classList.remove('dragging')}});
}
startIntroTransition=async function(name){if(tab==='绣工'){openIntro(name);return}current=name;const p=places[name];if(!p){openIntro(name);return}const px=tx+stage.offsetWidth*scale*p.x/100,py=ty+stage.offsetHeight*scale*p.y/100;if(px<innerWidth*.25||px>innerWidth*.75||py<innerHeight*.2||py>innerHeight*.8){tx+=innerWidth*.5-px;ty+=innerHeight*.46-py;applyTransform();await wait(380)}paperCut.style.setProperty('--hole-x',p.x+'%');paperCut.style.setProperty('--hole-y',p.y+'%');paperCut.classList.add('active');const start=performance.now(),dur=900;function frame(now){const t=Math.min(1,(now-start)/dur),e=1-Math.pow(1-t,3),r=860-680*e;paperCut.style.setProperty('--hole-rx',r+'px');paperCut.style.setProperty('--hole-ry',r+'px');if(t<1)requestAnimationFrame(frame)}requestAnimationFrame(frame);await wait(dur+80);openIntro(name)};
$('#intro').addEventListener('click',e=>{if(document.body.classList.contains('stitch-mode')||e.target.closest('.close-btn')||e.target.closest('#more')||e.target.closest('.stitch-switch'))return;openDetail()});
function panTo(nx,ny){return new Promise(resolve=>{const sx=tx,sy=ty,ox=nx+(nx-sx)*.045,oy=ny+(ny-sy)*.045,t0=performance.now(),d1=430,d2=180;function tick(now){const elapsed=now-t0;if(elapsed<d1){const t=elapsed/d1,e=1-Math.pow(1-t,4);tx=sx+(ox-sx)*e;ty=sy+(oy-sy)*e;applyTransform();requestAnimationFrame(tick)}else if(elapsed<d1+d2){const t=(elapsed-d1)/d2,e=1-Math.pow(1-t,3);tx=ox+(nx-ox)*e;ty=oy+(ny-oy)*e;applyTransform();requestAnimationFrame(tick)}else{tx=nx;ty=ny;applyTransform();resolve()}}requestAnimationFrame(tick)})}
startIntroTransition=async function(name){if(tab==='绣工'){openIntro(name);return}current=name;const p=getFocus(name);if(!p){openIntro(name);return}const px=tx+stage.offsetWidth*scale*p.x/100,py=ty+stage.offsetHeight*scale*p.y/100;if(px<innerWidth*.25||px>innerWidth*.75||py<innerHeight*.2||py>innerHeight*.8){await panTo(tx+innerWidth*.5-px,ty+innerHeight*.46-py)}paperCut.style.setProperty('--hole-x',p.x+'%');paperCut.style.setProperty('--hole-y',p.y+'%');paperCut.classList.add('active');const start=performance.now(),dur=900;function frame(now){const t=Math.min(1,(now-start)/dur),e=1-Math.pow(1-t,3),r=860-680*e;paperCut.style.setProperty('--hole-rx',r+'px');paperCut.style.setProperty('--hole-ry',r+'px');if(t<1)requestAnimationFrame(frame)}requestAnimationFrame(frame);await wait(dur+80);openIntro(name)};
let pinGesture=null;$('#pins').addEventListener('pointerdown',e=>{const pin=e.target.closest?.('.pin');if(pin)pinGesture={id:e.pointerId,x:e.clientX,y:e.clientY,tx,ty,moved:false}},true);$('#pins').addEventListener('pointermove',e=>{if(!pinGesture||e.pointerId!==pinGesture.id)return;const dx=e.clientX-pinGesture.x,dy=e.clientY-pinGesture.y;if(Math.hypot(dx,dy)>6)pinGesture.moved=true;if(pinGesture.moved){tx=pinGesture.tx+dx;ty=pinGesture.ty+dy;applyTransform()}},true);$('#pins').addEventListener('pointerup',e=>{if(!pinGesture||e.pointerId!==pinGesture.id)return;const pin=e.target.closest?.('.pin');if(pinGesture.moved&&pin)pin.dataset.suppress='1';setTimeout(()=>{if(pin)delete pin.dataset.suppress},80);pinGesture=null},true);$('#pins').addEventListener('click',e=>{const pin=e.target.closest?.('.pin');if(pin?.dataset.suppress){e.preventDefault();e.stopImmediatePropagation();delete pin.dataset.suppress}},true);
// 绣工介绍页使用同一张长卷和对应 exclude 图，支持多点拖动聚焦。
const legacyShow=show;
show=function(id){legacyShow(id);};
const legacyOpenIntro=openIntro;
openIntro=function(name){
  current=name; legacyOpenIntro(name);
  if(tab!=='绣工') return;
  document.body.classList.add('stitch-mode','stitch-notes-mode');
  $('#stitchArt').src='assets/figma/embroidery.png';
  $('#stitchExclude').style.display='none';
  $('#stitchScene').style.display='none';
  renderStitchPins(name);
  // 点位聚焦已由进入动画完成，介绍页不再二次平移。
  $('#more').style.display='none';
};
renderStitchPins=function(name){
  const box=$('#stitchPins'); if(!box)return; box.innerHTML='';
  stitchHomePoints.filter(p=>p.name===name).forEach((p,index)=>{
    const b=document.createElement('button'); b.className='stitch-pin'; b.title=`${p.name} · ${p.label}`;
    b.dataset.x=p.x; b.dataset.y=p.y; b.classList.toggle('active',index===0);
    b.onclick=e=>{e.stopPropagation();focusStitchPoint(p)}; box.appendChild(b);
  }); requestAnimationFrame(applyStitchPins);
};
startIntroTransition=async function(name){
  if(tab!=='绣工'){current=name;const p=getFocus(name);if(!p){openIntro(name);return}const px=tx+stage.offsetWidth*scale*p.x/100,py=ty+stage.offsetHeight*scale*p.y/100;if(px<innerWidth*.25||px>innerWidth*.75||py<innerHeight*.2||py>innerHeight*.8)await panTo(tx+innerWidth*.5-px,ty+innerHeight*.46-py);paperCut.style.setProperty('--hole-x',p.x+'%');paperCut.style.setProperty('--hole-y',p.y+'%');paperCut.classList.add('active');await wait(900);paperCut.classList.remove('active');openIntro(name);return}
  current=name; const point=stitchHomePoints.find(p=>p.name===name); if(point){const h=innerHeight,art=$('#stitchArt'),w=h*((art?.naturalWidth||4448)/(art?.naturalHeight||1080));const px=tx+w*scale*point.x/100,py=ty+h*scale*point.y/100;if(px<innerWidth*.25||px>innerWidth*.75||py<innerHeight*.2||py>innerHeight*.8)await panTo(tx+innerWidth*.5-px,ty+innerHeight*.46-py);} 
  paperCut.style.setProperty('--hole-x',(point?.x||50)+'%');paperCut.style.setProperty('--hole-y',(point?.y||50)+'%');paperCut.classList.add('active');await wait(900);paperCut.classList.remove('active');openIntro(name);
};
let stitchTransitionId=0;
const baseSetTab=setTab;
setTab=function(name){
  const switching=tab!==name;
  const leavingIntro=document.body.classList.contains('intro-mode')&&switching;
  stitchTransitionId++;
  const tabs=$('#tabs');
  tabs.dataset.active=name;
  $$('#tabs button').forEach(b=>b.classList.toggle('active',b.dataset.tab===name));
  if(leavingIntro){
    paperCut.classList.remove('active');
    show('home');
  }
  baseSetTab(name);
  if(name!=='绣工'){
    paperCut.classList.remove('active');
    document.body.classList.remove('stitch-mode','stitch-notes-mode');
    $('#stitchPins').innerHTML=''; $('#stitchNotes').innerHTML=''; $('#stitchScene').style.display='none';
    $('#more').style.display='';
    paperCut.style.maskImage=''; paperCut.style.webkitMaskImage='';
    paperCut.style.maskSize=''; paperCut.style.webkitMaskSize=''; paperCut.style.maskRepeat=''; paperCut.style.webkitMaskRepeat='';
    paperCut.style.width='';
    paperCut.style.zIndex=''; paperCut.style.opacity='';
    paperCut.querySelector('.stitch-hole-canvas')?.remove(); paperCut.querySelector(':scope > img')?.style.removeProperty('display');
  }
};
$$('[data-home]').forEach(button=>button.addEventListener('click',e=>{
  e.preventDefault(); e.stopPropagation();
  if(document.body.classList.contains('stitch-mode')){
    stitchTransitionId++; paperCut.classList.remove('active'); tab='俗韵'; current='';
    $('#tabs').dataset.active='俗韵'; $$('#tabs button').forEach(x=>x.classList.toggle('active',x.dataset.tab==='俗韵'));
    show('home'); renderPins(); renderEntries('俗韵',false);
  }else show('home');
}));
const stitchIntroClose=$('#intro .close-btn');
const closeStitchIntro=()=>{
  if(!document.body.classList.contains('stitch-mode'))return;
  stitchTransitionId++; paperCut.classList.remove('active'); tab='俗韵'; current='';
  $('#tabs').dataset.active='俗韵'; $$('#tabs button').forEach(x=>x.classList.toggle('active',x.dataset.tab==='俗韵'));
  document.body.classList.remove('stitch-mode','stitch-notes-mode','intro-mode');
  $('#intro').classList.add('is-hidden'); $('#home').classList.remove('is-hidden');
  renderPins(); renderEntries('俗韵',false);
};
if(stitchIntroClose)stitchIntroClose.addEventListener('click',e=>{
  if(!document.body.classList.contains('stitch-mode'))return;
  e.preventDefault(); e.stopImmediatePropagation(); stitchTransitionId++;
  paperCut.classList.remove('active'); tab='俗韵'; current='';
  $('#tabs').dataset.active='俗韵'; $$('#tabs button').forEach(x=>x.classList.toggle('active',x.dataset.tab==='俗韵'));
  document.body.classList.remove('stitch-mode','stitch-notes-mode','intro-mode');
  $('#intro').classList.add('is-hidden'); $('#home').classList.remove('is-hidden');
  renderPins(); renderEntries('俗韵',false);
},true);
if(stitchIntroClose)stitchIntroClose.addEventListener('pointerup',e=>{e.preventDefault();e.stopImmediatePropagation();closeStitchIntro();},true);
document.addEventListener('click',e=>{
  if(!document.body.classList.contains('stitch-mode'))return;
  const close=e.target.closest?.('#intro .close-btn');
  if(close){
    e.preventDefault(); e.stopImmediatePropagation(); stitchTransitionId++;
    paperCut.classList.remove('active'); tab='俗韵'; current='';
    $('#tabs').dataset.active='俗韵'; $$('#tabs button').forEach(x=>x.classList.toggle('active',x.dataset.tab==='俗韵'));
    document.body.classList.remove('stitch-mode','stitch-notes-mode','intro-mode');
    $('#intro').classList.add('is-hidden'); $('#home').classList.remove('is-hidden');
    renderPins(); renderEntries('俗韵',false); return;
  }
  const switchButton=e.target.closest?.('#stitchSwitch button');
  if(switchButton){e.preventDefault();e.stopImmediatePropagation();startIntroTransition(switchButton.textContent);}
},true);
const baseShow=show;
show=function(id){
  if(id!=='intro'||tab!=='绣工')stitchTransitionId++;
  baseShow(id);
  if(id==='home' || tab!=='绣工'){
    document.body.classList.remove('stitch-mode','stitch-notes-mode');
    $('#stitchPins').innerHTML=''; $('#stitchNotes').innerHTML=''; $('#stitchScene').style.display='none';
    $('#more').style.display='';
    paperCut.style.maskImage=''; paperCut.style.webkitMaskImage='';
    paperCut.style.maskSize=''; paperCut.style.webkitMaskSize=''; paperCut.style.maskRepeat=''; paperCut.style.webkitMaskRepeat='';
    paperCut.style.width='';
    paperCut.style.zIndex=''; paperCut.style.opacity='';
    paperCut.querySelector('.stitch-hole-canvas')?.remove(); paperCut.querySelector(':scope > img')?.style.removeProperty('display');
  }
};
const stitchNoteText={
  '直针':'也可叫齐针。最基础针法，线条平行整齐，起落针都在纹样边缘，分竖直针、横直针、斜平针。',
  '铺针':'长直针铺满底层，上面再叠加其他颜色。',
  '长短针':'长短针交错参差，针脚互相穿插，色彩过渡柔和。',
  '木梳套':'针距稀疏隔针相套，如草地上的小花。','单套':'第一批沿轮廓起针，后批插入前批缝隙，针脚较长，如山势线条、深咖边框。','双套':'套得更深、针脚短密，转折灵活，晕色细腻，如大树。','扁毛套':'顺着凤凰羽毛走势走针。','散套':'外缘整齐，内部线条长短参差，批批相叠，针针相嵌，如马路、大山。','集套':'全部针迹朝向圆心，越靠近圆心藏短针，如太阳。'
};
let stitchCanvasImage=null;
function setStitchHoleMask(name,radius){
  const points=stitchHomePoints.filter(p=>p.name===name); if(!points.length)return;
  let canvas=paperCut.querySelector('.stitch-hole-canvas');
  if(!canvas){canvas=document.createElement('canvas');canvas.className='stitch-hole-canvas';paperCut.appendChild(canvas)}
  canvas.width=4608;canvas.height=1118;canvas.style.cssText='display:block;width:auto;height:100%;max-width:none;position:absolute;left:0;top:0;';
  paperCut.style.width=(canvas.width/canvas.height*innerHeight)+'px';
  const ctx=canvas.getContext('2d');
  const draw=()=>{ctx.clearRect(0,0,canvas.width,canvas.height);if(stitchCanvasImage?.complete)ctx.drawImage(stitchCanvasImage,0,0,canvas.width,canvas.height);ctx.save();ctx.globalCompositeOperation='destination-out';for(const p of points){ctx.beginPath();ctx.arc(canvas.width*p.x/100,canvas.height*p.y/100,radius,0,Math.PI*2);ctx.fill()}ctx.restore()};
  if(!stitchCanvasImage){stitchCanvasImage=new Image();stitchCanvasImage.onload=draw;stitchCanvasImage.src='assets/figma/papercut-bg.png'} else draw();
  const img=paperCut.querySelector(':scope > img');if(img)img.style.display='none';paperCut.style.maskImage='none';paperCut.style.webkitMaskImage='none';paperCut.style.zIndex='8';paperCut.style.opacity='1';
}
renderStitchNotes=function(name){
  const box=$('#stitchNotes'); if(!box)return; box.classList.remove('is-visible'); box.innerHTML='';
  const brief=stitchRegions[name]?.brief||getBrief(name);
  stitchHomePoints.filter(p=>p.name===name).forEach((p,index)=>{
    const el=document.createElement('article'); el.className='stitch-note';
    el.dataset.x=p.x; el.dataset.y=p.label==='木梳套'?Math.max(8,p.y-18):p.y; el.classList.toggle('align-left',p.x>74); el.classList.toggle('note-wood-comb',p.label==='木梳套');
    el.style.setProperty('--note-delay',`${index*70}ms`);
    el.innerHTML=`<h3>${p.label}</h3><p>${stitchNoteText[p.label]||brief}</p>`; box.appendChild(el);
  });
  applyStitchNotes(); requestAnimationFrame(()=>box.classList.add('is-visible'));
};
function selectStitchButton(name){
  $$('#stitchSwitch button').forEach(b=>b.classList.toggle('active',b.textContent===name));
  const notes=$('#stitchNotes'); if(notes){notes.classList.remove('is-visible');notes.innerHTML='';}
}
applyStitchNotes=function(){
  const box=$('#stitchNotes'); if(!box)return; const h=stage.offsetHeight,w=stage.offsetWidth;
  box.querySelectorAll('.stitch-note').forEach(el=>{el.style.left=(tx+w*scale*Number(el.dataset.x)/100)+'px';el.style.top=(ty+h*scale*Number(el.dataset.y)/100)+'px'});
};
const legacyOpenDetail=openDetail;
openDetail=function(){if(tab==='绣工')return;legacyOpenDetail();};
// Restore the original animated transition for the landscape sections.
startIntroTransition=async function(name){
  if(tab==='绣工'){
    const transitionId=++stitchTransitionId;
    const switchingName=current!==name;
    selectStitchButton(name); current=name;const p=stitchHomePoints.find(x=>x.name===name)||{x:40,y:40};
    const introSwitch=document.body.classList.contains('intro-mode');
    const px=tx+stage.offsetWidth*scale*p.x/100,py=ty+stage.offsetHeight*scale*p.y/100;
    if(introSwitch&&switchingName){await panTo(tx+innerWidth*.5-px,ty+innerHeight*.46-py);if(transitionId!==stitchTransitionId)return;}
    setStitchHoleMask(name,introSwitch?1:860);paperCut.style.setProperty('--hole-x',p.x+'%');paperCut.style.setProperty('--hole-y',p.y+'%');paperCut.style.setProperty('--hole-rx',introSwitch?'1px':'860px');paperCut.style.setProperty('--hole-ry',introSwitch?'1px':'860px');paperCut.classList.add('active');
    const settledTx=tx,settledTy=ty;
    const t0=performance.now(),dur=900;function frame(now){if(transitionId!==stitchTransitionId)return;const t=Math.min(1,(now-t0)/dur),e=1-Math.pow(1-t,3),r=introSwitch?(1+179*e):(860-680*e);setStitchHoleMask(name,r);paperCut.style.setProperty('--hole-rx',r+'px');paperCut.style.setProperty('--hole-ry',r+'px');if(t<1)requestAnimationFrame(frame)}requestAnimationFrame(frame);await wait(dur+80);if(transitionId!==stitchTransitionId)return;openIntro(name);tx=settledTx;ty=settledTy;applyTransform();setStitchHoleMask(name,180);paperCut.classList.add('active');return;
  }
  const transitionId=++stitchTransitionId;
  current=name;const p=getFocus(name);if(!p){openIntro(name);return}
  const px=tx+stage.offsetWidth*scale*p.x/100,py=ty+stage.offsetHeight*scale*p.y/100;
  if(px<innerWidth*.25||px>innerWidth*.75||py<innerHeight*.2||py>innerHeight*.8){await panTo(tx+innerWidth*.5-px,ty+innerHeight*.46-py);if(transitionId!==stitchTransitionId)return;}
  paperCut.style.setProperty('--hole-x',p.x+'%');paperCut.style.setProperty('--hole-y',p.y+'%');paperCut.classList.add('active');
  const start=performance.now(),dur=900;function frame(now){if(transitionId!==stitchTransitionId)return;const t=Math.min(1,(now-start)/dur),e=1-Math.pow(1-t,3),r=860-680*e;paperCut.style.setProperty('--hole-rx',r+'px');paperCut.style.setProperty('--hole-ry',r+'px');if(t<1)requestAnimationFrame(frame)}requestAnimationFrame(frame);await wait(dur+80);if(transitionId!==stitchTransitionId)return;openIntro(name);
};
