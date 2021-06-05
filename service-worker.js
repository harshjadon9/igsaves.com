const cacheName = 'igsaves-cache-v1';
const resourcesToPrecache = [
    '/',
    '/img/min/logo.png',
    '/img/min/igtv.webp',
    '/img/min/reel.webp',
    '/img/min/photos.webp',
    '/img/min/video.webp',
    '/img/min/carousels.webp',
    '/img/min/step1.webp',
    '/img/min/step2.webp',
    '/img/min/step3.webp',
    '/img/min/pnv.webp',
];

self.addEventListener('install', event => {
    console.log('SW-js Installed! 😃');
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                return cache.addAll(resourcesToPrecache);
            })
            .then(caches.keys().then((keyList) => {
                    return Promise.all(keyList.map((key) => {
                        if (cacheName.indexOf(key) === -1) {
                            return caches.delete(key);
                        }
                    }));
                })
            )
    );
});

self.addEventListener('activate', event => {
    console.log(' SW-js Activated 😎');
});

self.addEventListener('fetch', event => {
    event.respondWith(caches.match(event.request)
        .then(cachedResponse => {
            return cachedResponse || fetch(event.request);
        })
    );
});