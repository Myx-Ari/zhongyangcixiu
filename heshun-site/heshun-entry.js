// The new site opens on the original scroll; the added entry belongs to its 绣工 tab.
const heshunButton = document.createElement('a');
heshunButton.className = 'heshun-entry';
heshunButton.href = 'heshun/zhongyang.html';
heshunButton.title = '了解中阳刺绣';
heshunButton.innerHTML = '<img src="../assets/heshun/中阳刺绣图标.png" alt=""><span>中阳刺绣</span>';
document.querySelector('#home').appendChild(heshunButton);
const originalHeshunButton = heshunButton;
const heshunButton2 = document.createElement('a');
heshunButton2.className = 'heshun-entry heshun-entry-secondary';
heshunButton2.href = 'heshun/index.html';
heshunButton2.title = '进入和顺牵绣';
heshunButton2.innerHTML = '<img src="../assets/heshun/和顺牵绣图标.png" alt=""><span>和顺牵绣</span>';
document.querySelector('#home').appendChild(heshunButton2);

function syncHeshunEntry() {
  const visible=document.querySelector('#tabs').dataset.active === '绣工'; originalHeshunButton.hidden=!visible; heshunButton2.hidden=!visible;
}
document.querySelector('#tabs').addEventListener('click', () => setTimeout(syncHeshunEntry, 0));
syncHeshunEntry();
if (new URLSearchParams(location.search).get('tab') === 'stitch') {
  setTab('绣工');
  syncHeshunEntry();
}
