const fs = require('node:fs/promises');
const path = require('node:path');

exports.run = async (window, errors) => {
  const output = process.env.EMBROIDERY_TEST_OUTPUT;
  if (!output) throw new Error('EMBROIDERY_TEST_OUTPUT must name the test output directory.');
  const result = await window.webContents.executeJavaScript(`(async () => {
    const assert = (condition, text) => { if (!condition) throw new Error(text); };
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    const imagePaths = new Set([...document.images].filter(image => image.hasAttribute('src')).map(image => image.src));
    Object.values(detailHeroes).forEach(file => imagePaths.add('assets/detail-hero/' + file));
    Object.values(data).forEach(entry => (entry.deep || []).forEach(section => {
      if (section.image) imagePaths.add('assets/deep/' + section.image);
    }));
    const loadImage = src => new Promise((resolve, reject) => {
      const image = new Image();
      const timer = setTimeout(() => reject(new Error('Image timeout: ' + src)), 30000);
      image.onload = () => { clearTimeout(timer); resolve(); };
      image.onerror = () => { clearTimeout(timer); reject(new Error('Missing image: ' + src)); };
      image.src = src;
    });
    for (const src of imagePaths) await loadImage(src);
    const art = document.querySelector('.scroll-art');
    assert(art.naturalWidth === 14592 && art.naturalHeight === 3540, 'Scan size changed');
    assert(document.querySelectorAll('#pins .pin').length === 11, 'Home pins missing');
    for (const audio of document.querySelectorAll('audio')) {
      await new Promise((resolve, reject) => {
        if (audio.readyState >= 1) return resolve();
        const timer = setTimeout(() => reject(new Error('Audio timeout: ' + audio.src)), 20000);
        audio.addEventListener('loadedmetadata', () => { clearTimeout(timer); resolve(); }, {once:true});
        audio.addEventListener('error', () => { clearTimeout(timer); reject(new Error('Audio missing: ' + audio.src)); }, {once:true});
        audio.load();
      });
      assert(Number.isFinite(audio.duration) && audio.duration > 0, 'Invalid audio');
    }
    // Keep the automated check inaudible while exercising real playback.
    Object.values(sounds).forEach(audio => audio.volume = 0);
    audioUnlocked = true;
    await sounds.button.play();
    sounds.button.pause();
    setTab('风物');
    await startIntroTransition('南川河');
    assert(!document.querySelector('#intro').classList.contains('is-hidden'), 'Intro did not open');
    openDetail();
    assert(document.querySelector('#detailSections').children.length > 0, 'Detail did not render');
    document.querySelector('#detail [data-home]').click();
    assert(!document.querySelector('#home').classList.contains('is-hidden'), 'Return home failed');
    setTab('绣工');
    await startIntroTransition('平针');
    const notes = [...document.querySelectorAll('#stitchNotes h3')].map(el => el.textContent);
    assert(notes.length === 4 && notes.filter(text => text === '铺针').length === 2, 'Flat stitch notes changed');
    assert(document.querySelector('.stitch-hole-canvas'), 'Stitch cutouts missing');
    closeStitchIntro();
    setAmbient(null);
    await delay(300);
    return { offline: true, protocol: location.protocol, imageCount: imagePaths.size,
      audioCount: document.querySelectorAll('audio').length, notes, scan: [art.naturalWidth, art.naturalHeight] };
  })()`, true);
  if (errors.length) throw new Error(errors.join('\n'));
  await fs.mkdir(output, { recursive: true });
  await fs.writeFile(path.join(output, 'offline-test.json'), JSON.stringify({ ...result, errors, passed: true }, null, 2));
  await fs.writeFile(path.join(output, 'offline-preview.png'), (await window.webContents.capturePage()).toPNG());
  console.log('OFFLINE_SMOKE_TEST_PASSED', JSON.stringify(result));
};
