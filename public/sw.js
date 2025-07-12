const CACHE_NAME = 'wahyu-portfolio-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/src/assets/main.css',
    '/src/assets/base.css',
    '/src/assets/bg.css',
    'https://storage.wahyuivan.dev/profile.webp',
    'https://storage.wahyuivan.dev/Screenshot%202024-10-06%20at%2010.11.37.webp'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Return cached version or fetch from network
                return response || fetch(event.request);
            })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
}); 