const CACHE_NAME = "test-cache";
const urlToCache = ["index.html", "offline.html"];

const self = this;

// install cache
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Cache Open", cache);
      return cache.addAll(urlToCache);
    })
  );
});

// listen for request
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return fetch(event.request).catch((error) =>
        caches.match("offline.html")
      );
    })
  );
});

//activate SW
self.addEventListener("activate", (event) => {
  const cacheToWhieList = [];
  cacheToWhieList.push(CACHE_NAME);
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheToWhieList.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
