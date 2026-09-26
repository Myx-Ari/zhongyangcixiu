const VERSION = 'zhongyang-offline-v20260926-2';
const CORE = [
  './', './index.html', './style.css', './content-data.js', './script.js', './heshun-entry.js',
  './heshun-site/index.html', './heshun-site/style.css', './heshun-site/content-data.js', './heshun-site/script.js',
  './heshun-site/heshun/index.html', './heshun-site/heshun/app.js', './heshun-site/heshun/style.css',
  './heshun-site/heshun/zhongyang.html', './manifest.webmanifest', './offline-assets.json'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(VERSION).then(async cache => {
    await cache.addAll(CORE);
    const assets = await fetch('./offline-assets.json').then(response => response.json());
    for (let i = 0; i < assets.length; i += 4) {
      await Promise.all(assets.slice(i, i + 4).map(url => cache.add(url)));
    }
  }).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(
    keys.filter(key => key.startsWith("zhongyang-offline-") && key !== VERSION).map(key => caches.delete(key))
  )).then(() => self.clients.claim()));
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET' || !request.url.startsWith(self.location.origin)) return;
  event.respondWith(caches.open(VERSION).then(cache => cache.match(request, {ignoreSearch:true})).then(cached => {
    if (cached) return cached;
    return fetch(request).then(response => {
      if (response.ok && response.type === 'basic') {
        const copy = response.clone();
        caches.open(VERSION).then(cache => cache.put(request, copy));
      }
      return response;
    }).catch(() => request.mode === 'navigate' ? caches.match('./index.html') : Response.error());
  }));
});
