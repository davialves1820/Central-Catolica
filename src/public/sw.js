// sw.js — Service Worker for Paróquia MJP PWA
// Estratégia: Cache First para assets estáticos, Network First para páginas

const CACHE_NAME = "mjp-paroquia-v1";
const STATIC_CACHE = "mjp-static-v1";

// Assets que sempre queremos em cache
const PRECACHE_URLS = [
    "/",
    "/liturgia",
    "/biblia",
    "/calendario",
    "/offline",
    "/images/menino-jesus-logo.png",
    "/images/church.jpg",
];

// ── Install ────────────────────────────────────────────────────
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches
            .open(STATIC_CACHE)
            .then((cache) => cache.addAll(PRECACHE_URLS))
            .then(() => self.skipWaiting()),
    );
});

// ── Activate ───────────────────────────────────────────────────
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches
            .keys()
            .then((keys) =>
                Promise.all(
                    keys
                        .filter((k) => k !== CACHE_NAME && k !== STATIC_CACHE)
                        .map((k) => caches.delete(k)),
                ),
            )
            .then(() => self.clients.claim()),
    );
});

// ── Fetch ──────────────────────────────────────────────────────
self.addEventListener("fetch", (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET and cross-origin requests
    if (request.method !== "GET" || url.origin !== location.origin) return;

    // API calls — always network, never cache
    if (url.pathname.startsWith("/api/")) return;

    // Static assets (images, fonts, _next/static) — Cache First
    if (
        url.pathname.startsWith("/_next/static/") ||
        url.pathname.startsWith("/images/") ||
        url.pathname.match(/\.(png|jpg|jpeg|svg|ico|woff2?)$/)
    ) {
        event.respondWith(
            caches.match(request).then(
                (cached) =>
                    cached ||
                    fetch(request).then((res) => {
                        const clone = res.clone();
                        caches.open(STATIC_CACHE).then((c) => c.put(request, clone));
                        return res;
                    }),
            ),
        );
        return;
    }

    // Pages — Network First, fallback to cache, fallback to /offline
    event.respondWith(
        fetch(request)
            .then((res) => {
                const clone = res.clone();
                caches.open(CACHE_NAME).then((c) => c.put(request, clone));
                return res;
            })
            .catch(() =>
                caches
                    .match(request)
                    .then((cached) => cached || caches.match("/offline")),
            ),
    );
});