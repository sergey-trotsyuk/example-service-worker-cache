// global this === new ServiceWorkerGlobalScope()

console.log('Listen "install"');
addEventListener('install', (event) => {
    // Save cache
    event.waitUntil(
        caches.open('v1').then((cache) => {
            console.log('SW Cache openned');
            return cache.addAll([
                '/',
                '/index.html',
                '/index.css',
                '/index.js'
            ]).then(() => {
                console.log('Files cached');
            });
        })
    );
});


console.log('Listen "fetch"');
addEventListener('fetch', (event) => {
    console.log('Fetch', event.request.url);

    // Handle cache
    event.respondWith(
        caches.match(event.request).catch(() => {
            console.log('Cache miss', event.request.url);

            // Cache miss
            return fetch(event.request);
        })
    );
});