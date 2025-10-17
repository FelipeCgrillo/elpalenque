// Service Worker para Cabalgatas El Palenque
// Proporciona funcionalidades PWA básicas

const CACHE_NAME = 'elpalenque-v1.0.0';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/assets/logo.png',
    '/assets/hero-image.png',
    '/assets/gaucho-portrait.jpg',
    '/assets/route1.jpg',
    '/assets/route2.jpg',
    '/assets/route3.jpg',
    'https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700;900&family=Lora:wght@400;500;600;700&family=Lato:wght@300;400;500;700&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

// Instalación del Service Worker
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Cache abierto');
                return cache.addAll(urlsToCache);
            })
    );
});

// Interceptar peticiones de red
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // Cache hit - devolver respuesta
                if (response) {
                    return response;
                }

                return fetch(event.request).then(
                    function(response) {
                        // Verificar si recibimos una respuesta válida
                        if(!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // IMPORTANTE: Clonar la respuesta. Una respuesta es un stream
                        // y porque queremos que el navegador consuma la respuesta
                        // así como el cache la consuma, necesitamos clonarla
                        var responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then(function(cache) {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                );
            })
    );
});

// Actualizar Service Worker
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Eliminando cache antiguo:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
