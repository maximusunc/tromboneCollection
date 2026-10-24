// Older versions of this site registered a service worker. Browsers that still
// have it installed will fetch this file, which removes it so they load the current site.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => {
    event.waitUntil(
        self.registration.unregister()
            .then(() => self.clients.matchAll({ type: "window" }))
            .then((clients) => clients.forEach((client) => client.navigate(client.url)))
    );
});
