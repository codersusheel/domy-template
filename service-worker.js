
const CACHE_NAME = "temi-v1";

const OFFLINE_URL = "/offline.html";
const NOT_FOUND_URL = "/404.html";
const FORBIDDEN_URL = "/403.html";

const ASSETS = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",
  OFFLINE_URL,
  NOT_FOUND_URL,
  FORBIDDEN_URL
];

// INSTALL
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );

  self.skipWaiting();
});

// ACTIVATE
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );

  self.clients.claim();
});

// FETCH
self.addEventListener("fetch", event => {
  const request = event.request;

  if (request.method !== "GET") return;

  event.respondWith(
    fetch(request)
      .then(response => {
        if (response.status === 403) {
          return caches.match(FORBIDDEN_URL);
        }

        if (response.status === 404) {
          return caches.match(NOT_FOUND_URL);
        }

        if (response.ok) {
          const copy = response.clone();

          caches.open(CACHE_NAME).then(cache => {
            cache.put(request, copy);
          });
        }

        return response;
      })
      .catch(async () => {
        if (request.mode === "navigate") {
          return (
            await caches.match(request) ||
            await caches.match(OFFLINE_URL)
          );
        }

        return caches.match(request);
      })
  );
});
