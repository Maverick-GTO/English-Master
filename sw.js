const CACHE_NAME = 'english-master-v3';
const ASSETS = [
  './index.html',
  './manifest.json',
  './sw.js',
  'https://img.icons8.com/ios-filled/512/ffffff/abc-block.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
