const CACHE_NAME = 'offline-cache-v1';
const FILES_TO_CACHE = [
  // Root files
  '/',
  '/index.html',
  '/null.html',
  '/ucbg-games.html',
  '/ucbg.html',
  '/404.html',
  '/408.html',
  '/frame.html',
  '/appmanifest.json',
  '/favicon.ico',
  '/sw.js',

  // CSS files
  '/css/null.css',
  '/unity/TemplateData/style.css',
  '/cdn/bootstrap.3.4.1.min.css',
  '/cdn/bootstrap.4.5.0.min.css',
  '/cdn/bootstrap.4.5.0.bundle.min.js',
  '/cdn/fontawesome.5.12.0.all.css',
  '/cdn/ionicons.2.0.1.min.css',

  // JavaScript files
  '/js/YYGGames.js',
  '/js/YYGGamesx.js',
  '/js/gamesnacks-developer-v1.js',
  '/js/gc-sdk.js',
  '/js/gm-sdk-mobile.js',
  '/js/unity-2020.js',
  '/js/unity.js',
  '/gamepix/gamepix-adapter.js',
  '/gamepix/gamepix.sdk.js',
  '/gamepix/sdk.js',
  '/gamepix/tiny-loader.js',
  '/google/ima3.js',
  '/google/ima3-o.js',
  '/unity/TemplateData/UnityProgress.js',
  '/unity/TemplateData/UnityLoader.js',
  '/sdkv3/master-loader.js',
  '/sdkv3/poki-sdk-core.js',
  '/sdkv3/poki-sdk.js',
  '/sdkv3/unity.js',
  '/patch/4j/com4japi.js',
  '/patch/4j/game.css',
  '/fonts/torus-bold-webfont.woff',
  '/fonts/torus-bold-webfont.woff2',

  // JSON files
  '/json/config.json',
  '/json/datax.json',
  '/json/dataxx.json',
  '/json/null.json',
  '/json/ping.json',
  '/json/yad-games.json',
  '/patch/4j/moregames.json',
  '/patch/4j/setting.json',

  // Images
  '/images/gamemonetize-logo.png',
  '/images/games235-null.png',
  '/images/null.png',
  '/images/ucbg-banner.png',
  '/images/ucbg-big-logo.png',
  '/patch/4j/blank.png',
  '/patch/4j/ellipsis.svg',
  '/patch/4j/new_ui_sprite.webp',
  '/patch/4j/loading.gif',
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Caching files...');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
