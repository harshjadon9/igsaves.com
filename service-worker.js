const cacheName = 'igsaves-cache-v1';
const resourcesToPrecache = [
    '/',
    '/img/min/logo.png',
];

self.addEventListener('install', event => {
    console.log('✔ SW Installed! ');
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
    console.log('🚀 Activate SW!');
});

self.addEventListener('fetch', event => {
    event.respondWith(caches.match(event.request)
        .then(cachedResponse => {
            return cachedResponse || fetch(event.request);
        })
    );
});