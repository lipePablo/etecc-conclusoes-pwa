const CACHE_NAME = 'etecc-conclusoes-v4.0.3';
const OFFLINE_URL = '/offline.html';
const VERSION_URL = '/version.json';

// Assets que devem ser sempre cached (core da aplicaÃ§Ã£o)
const CORE_CACHE = [
  '/',
  '/index.html',
  '/offline.html',
  '/version.json',
  '/assets/css/styles.css',
  '/assets/css/theme.css',
  '/assets/css/loading.css',
  '/assets/js/main.js',
  '/assets/images/E_vermelha_nova.png',
  '/assets/images/logo_vermelha_nova.png',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.16/jquery.mask.min.js'
];

// Instalar Service Worker
self.addEventListener('install', event => {
  console.log('Service Worker instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(CORE_CACHE);
      })
      .then(() => {
        console.log('Assets principais em cache');
        return self.skipWaiting();
      })
  );
});

// Ativar Service Worker
self.addEventListener('activate', event => {
  console.log('Service Worker ativado');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Removendo cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// Interceptar requests
self.addEventListener('fetch', event => {
  // SÃ³ interceptar requests HTTP/HTTPS
  if (!event.request.url.startsWith('http')) return;

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retorna do cache se disponÃ­vel
        if (response) {
          return response;
        }

        // Para recursos core, sempre tentar buscar online primeiro
        if (CORE_CACHE.includes(event.request.url) ||
            event.request.url.includes('fonts.googleapis.com') ||
            event.request.url.includes('cdnjs.cloudflare.com')) {

          return fetch(event.request)
            .then(response => {
              // Verifica se Ã© uma resposta vÃ¡lida
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }

              // Clona a resposta para cache
              const responseToCache = response.clone();
              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(event.request, responseToCache);
                });

              return response;
            })
            .catch(() => {
              // Se falhar, tenta do cache
              return caches.match(event.request);
            });
        }

        // Para outros recursos, busca online
        return fetch(event.request)
          .catch(() => {
            // Se estiver offline e for uma navegaÃ§Ã£o, mostra pÃ¡gina offline
            if (event.request.mode === 'navigate') {
              return caches.match(OFFLINE_URL) || caches.match('/');
            }

            // Para outros recursos, tenta do cache
            return caches.match(event.request);
          });
      })
  );
});

// Verificar versÃ£o remota periodicamente
async function checkForUpdates() {
  try {
    const response = await fetch(VERSION_URL, { cache: 'no-cache' });
    const versionData = await response.json();

    // Notificar clientes sobre verificaÃ§Ã£o de versÃ£o
    const clients = await self.clients.matchAll();
    clients.forEach(client => {
      client.postMessage({
        type: 'VERSION_CHECK',
        data: versionData
      });
    });
  } catch (error) {
    console.log('Erro ao verificar versÃ£o:', error);
  }
}

// Verificar atualizaÃ§Ãµes a cada 30 minutos
setInterval(checkForUpdates, 10 * 60 * 1000);

// Escutar mensagens do app principal
self.addEventListener('message', event => {
  if (event.data && event.data.type) {
    switch (event.data.type) {
      case 'SKIP_WAITING':
        self.skipWaiting();
        break;
      case 'GET_VERSION':
        event.ports[0].postMessage({ version: CACHE_NAME });
        break;
      case 'CHECK_VERSION':
        checkForUpdates();
        break;
    }
  }
});

// Notificar sobre atualizaÃ§Ãµes
self.addEventListener('updatefound', () => {
  console.log('Nova versÃ£o do Service Worker encontrada');

  // Notifica todos os clientes sobre a atualizaÃ§Ã£o
  self.clients.matchAll().then(clients => {
    clients.forEach(client => {
      client.postMessage({
        type: 'UPDATE_AVAILABLE'
      });
    });
  });
});




