const CACHE = 'si-helper-v11';
const ASSETS = [
  './',
  './index.html',
  './font/FreehandSpirit07.ttf',
  './images/fear.png',
  './images/adversaries/prussia.png',
  './images/adversaries/prussia_flag.png',
  './images/adversaries/sweden.png',
  './images/adversaries/sweden_flag.png',
  './images/adversaries/england.png',
  './images/adversaries/england_flag.png',
  './images/adversaries/france.png',
  './images/adversaries/france_flag.png',
  './images/adversaries/russia.png',
  './images/adversaries/russia_flag.png',
  './images/adversaries/hlc.png',
  './images/adversaries/hlc_flag.png',
  './images/adversaries/hme.png',
  './images/adversaries/hme_flag.png',
  './images/adversaries/scotland.png',
  './images/adversaries/scotland_flag.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
