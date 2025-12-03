// sw.js - Service Worker optimizado para Tassili Shopping
const CACHE_NAME = 'tassili-shopping-v2.1';

// URLs para cachear
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json',
  '/logo192.png',
  '/logo512.png'
];

// Instalación
self.addEventListener('install', (event) => {
  console.log('🚀 Service Worker Tassili Shopping en cours d\'installation...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('📦 Cache ouvert pour Tassili Shopping');
        // Cachear recursos con gestion d'erreurs
        return Promise.all(
          urlsToCache.map((url) => {
            return cache.add(url).catch((error) => {
              console.log(`❌ Erreur de cache pour ${url}:`, error);
            });
          })
        );
      })
      .then(() => {
        console.log('✅ Toutes les ressources de Tassili Shopping sont en cache');
        return self.skipWaiting();
      })
  );
});

// Activation
self.addEventListener('activate', (event) => {
  console.log('🎯 Service Worker Tassili Shopping activé');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Suppression de l\'ancien cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Réclamer les clients immédiatement
      return self.clients.claim();
    })
  );
});

// Fetch - Stratégie améliorée
self.addEventListener('fetch', (event) => {
  // Ignorer les requêtes qui ne sont pas GET
  if (event.request.method !== 'GET') return;

  // Pour les routes API, utiliser Network First et ne pas cacher
  if (event.request.url.includes('/api/')) {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          // Retourner le cache pour API seulement en cas d'erreur réseau
          return caches.match(event.request);
        })
    );
    return;
  }

  // Pour la navigation (HTML), utiliser Network First
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Vérifier si la réponse est valide
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseClone);
              });
          }
          return response;
        })
        .catch(() => {
          // Si le réseau échoue, retourner la page d'accueil du cache
          return caches.match('/')
            .then((cachedResponse) => {
              if (cachedResponse) {
                return cachedResponse;
              }
              // Si rien dans le cache, retourner une page hors ligne basique
              return new Response(`
                <!DOCTYPE html>
                <html lang="fr">
                <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Tassili Shopping - Hors ligne</title>
                  <style>
                    body { 
                      font-family: Arial, sans-serif; 
                      text-align: center; 
                      padding: 50px; 
                      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                      color: white;
                    }
                    h1 { font-size: 2.5rem; margin-bottom: 20px; }
                    p { font-size: 1.2rem; margin-bottom: 30px; }
                    .logo { font-size: 3rem; margin-bottom: 20px; }
                  </style>
                </head>
                <body>
                  <div class="logo">🛍️</div>
                  <h1>Tassili Shopping</h1>
                  <p>Vous êtes actuellement hors ligne.</p>
                  <p>Veuillez vérifier votre connexion Internet.</p>
                  <p>Vos produits seront disponibles dès que la connexion sera rétablie.</p>
                </body>
                </html>
              `, {
                status: 503,
                statusText: 'Hors ligne',
                headers: new Headers({ 'Content-Type': 'text/html' })
              });
            });
        })
    );
    return;
  }

  // Pour les ressources statiques (JS, CSS, images), utiliser Cache First
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Si existe dans le cache, le retourner
        if (cachedResponse) {
          return cachedResponse;
        }

        // Si pas dans le cache, chercher sur le réseau
        return fetch(event.request)
          .then((response) => {
            // Vérifier que la réponse est valide
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Cloner la réponse pour la sauvegarder dans le cache
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            // Fallback pour différents types de ressources
            if (event.request.destination === 'image') {
              // Retourner une image placeholder pour Tassili Shopping
              return new Response('', {
                status: 404,
                statusText: 'Image non trouvée'
              });
            }
            return new Response('Hors ligne - Tassili Shopping', {
              status: 503,
              statusText: 'Service indisponible'
            });
          });
      })
  );
});