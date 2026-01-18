// Name des Caches - bei Updates die Versionsnummer erhöhen
const CACHE_NAME = 'english-master-v2';

// Dateien, die für den Offline-Betrieb gespeichert werden
const ASSETS_TO_CACHE = [
  'index.html',
  'manifest.json',
  'sw.js',
  'https://img.icons8.com/ios-filled/512/ffffff/abc-block.png'
];

// 1. Installation: Dateien in den Cache laden
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Service Worker: Dateien werden gecacht');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  // Aktiviert den Service Worker sofort
  self.skipWaiting();
});

// 2. Aktivierung: Alte Cache-Versionen löschen
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Service Worker: Alter Cache wird gelöscht', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// 3. Fetch-Event: Notwendig, damit Chrome die App-Installation erlaubt
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Ressource aus dem Cache zurückgeben oder aus dem Netzwerk laden
      return response || fetch(event.request);
    })
  );
});
