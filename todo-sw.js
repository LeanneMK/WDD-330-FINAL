console.log("Speak Kindness");

window.self.addEventListener("install", function (e) {
    console.log("worker installed");
    e.waitUntil(
        caches.open("todo").then(function (cache) {
            console.log("caching");

            return cache.addAll([
                "/",
                "/index.html",
                "index.js"
            ]);
        })
    );
});

window.self.addEventListener("fetch", function (e) {
    console.log("fetching: ", e.request.url);
    e.respondWith(
        fetch(e.request)
        .catch(() => caches.match(e.request))
    );
});