const asset = name => `../../assets/heshun/${name}.png`;
const works = [
  {name:'作品一',image:'作品1',points:[
    {name:'缠绕滚针绣',x:66,y:29,image:'缠绕滚针绣',text:'尖角采用缠绕滚针绣。针针逼紧、不露针眼，针眼藏于线下呈“拧麻花”状，适合表现弯曲缠绕的线条。',reference:'和顺牵绣深入介绍-1'},
    {name:'绣球穿针绣',x:49,y:52,image:'绣球穿针绣',text:'以绣线往复穿绕、层层编结成立体球状纹样，肌理如编织。'},
    {name:'锁边盘针绣',x:18,y:65,image:'锁边盘针绣',text:'以接针、滚针盘旋而绣，顺着纹样回旋方向短针密排；锁边绣通过连续环套包裹边缘，兼具固定与装饰作用。'},
    {name:'缠绣',x:69,y:69,image:'缠绣',text:'牙齿使用缠绣。将绣线反复缠绕在绣花针上运针，线条方向一致、匀密整齐，立体感强。'},
    {name:'撕毛针',x:82,y:66,image:'撕毛针',text:'蓝色鬃毛边采用撕毛针技法。劈细丝线、层层施绣，表现出毛茸茸的质感。',reference:'和顺牵绣深入介绍-2'}
  ]},
  {name:'作品二',image:'作品2',points:[
    {name:'齐套针',x:33,y:21,image:'齐套针',text:'牡丹花使用齐套针。第一批从边缘齐整起针，后一批嵌入前一批空隙，层层套接，色彩过渡自然。'},
    {name:'滚针',x:56,y:16,image:'滚针',text:'胡须使用滚针技法。第二针插入第一针中偏前些，针针逼紧，把针脚藏在线下。',reference:'和顺牵绣深入介绍-3'},
    {name:'包圆挑针绣',x:70,y:35,image:'包圆挑针绣',text:'先将棉絮垫入绣出凸起圆珠，再沿圆球边缘以短针层层盘包、挑绣收圆，形成立体饱满的龙睛。',reference:'和顺牵绣深入介绍'},
    {name:'反针，链接针',x:51,y:51,image:'反针，链接针',text:'反抢针使针迹批批齐整、丝理方向一致；接针将长线段逐段接续，绣出外围的回字纹边框。'},
    {name:'开片立体造型',x:36,y:72,image:'开片立体造型',text:'鼻子采用开片立体造型，其中结合贯针、滚针和散针。'},
    {name:'垫高绣齐套针',x:83,y:67,image:'垫高绣齐套针',text:'龙头鼻子先以棉花或线絮垫高底层，再覆线绣制，使纹样凸起呈浮雕状。'}
  ]}
];
let workIndex=0,pointIndex=0;
const home=document.querySelector('#home'),detail=document.querySelector('#detail');
const sounds={button:document.querySelector('#audioButton'),transition:document.querySelector('#audioTransition'),switch:document.querySelector('#audioSwitch'),rural:document.querySelector('#audioRural')};let audioUnlocked=false;
function playSound(name){const sound=sounds[name];if(!sound)return;if(!audioUnlocked){audioUnlocked=true;Object.values(sounds).forEach(s=>{if(s){s.muted=true;s.play().catch(()=>{});s.pause();s.currentTime=0;s.muted=false}})}sound.currentTime=0;sound.play().catch(()=>{})}
function openWork(index){playSound('button');workIndex=index;pointIndex=0;home.classList.add('hidden');detail.classList.remove('hidden');playSound('transition');render()}
function showHome(){playSound('button');detail.classList.add('hidden');home.classList.remove('hidden')}
function nextStitch(){playSound('switch');if(++pointIndex===works[workIndex].points.length){workIndex=(workIndex+1)%works.length;pointIndex=0}render()}
function render(){
  const work=works[workIndex],point=work.points[pointIndex],composed=document.querySelector('#composed');
  composed.classList.remove('hidden');
  const pieceImage=document.querySelector('#pieceImage');pieceImage.src=asset(workIndex===0?'作品一-底图':'作品2-底图');pieceImage.alt=work.name;pieceImage.classList.toggle('round-piece',workIndex===1);
  document.querySelector('#closeup').src=asset(point.image);document.querySelector('#closeup').alt=`${point.name}局部`;document.querySelector('#stitchName').textContent=point.name;document.querySelector('#stitchText').textContent=point.text;
  document.querySelector('#next').setAttribute('aria-label',pointIndex===work.points.length-1?'下一作品':'下一针');const nextWork=pointIndex===work.points.length-1;document.querySelector('#nextImage').src=asset(nextWork?'下一作品':'下一针');document.querySelector('#nextImage').alt=nextWork?'下一作品':'下一针';
  const markerHost=document.querySelector('#markers');markerHost.innerHTML='';
  const points=document.querySelector('#pointButtons');points.innerHTML='';
  work.points.forEach((item,index)=>{const button=document.createElement('button');button.className='point';button.classList.toggle('active',index===pointIndex);button.style.left=`${workIndex===1?item.x*.76+12:item.x}%`;button.style.top=`${workIndex===1?item.y*.76+12:item.y}%`;button.title=item.name;button.setAttribute('aria-label',`切换到${item.name}`);button.onclick=()=>{playSound('switch');pointIndex=index;render()};markerHost.appendChild(button)});
}
document.querySelectorAll('[data-work]').forEach(button=>button.onclick=()=>openWork(Number(button.dataset.work)));
document.querySelector('#back').onclick=showHome;document.querySelector('#next').onclick=nextStitch;
document.querySelector('.home-back').addEventListener('click',()=>playSound('button'));
document.addEventListener('pointerdown',()=>{if(!audioUnlocked){audioUnlocked=true;playSound('button')}},{once:true});
