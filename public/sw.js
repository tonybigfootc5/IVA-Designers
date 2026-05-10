self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("iva-shell-v1").then((cache) =>
      cache.addAll(["/", "/courses", "/pricing", "/blog"]),
    ),
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  if (event.request.url.includes("/api/")) return;

  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request)),
  );
});
