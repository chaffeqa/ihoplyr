
import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry } from "@serwist/precaching";
import { installSerwist } from "@serwist/sw";
import { CacheFirst, NetworkFirst, StaleWhileRevalidate } from "@serwist/strategies";
import { ExpirationPlugin } from "@serwist/expiration";

declare global {
    interface WorkerGlobalScope {
        __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
    }
}

declare const self: ServiceWorkerGlobalScope;

installSerwist({
    precacheEntries: self.__SW_MANIFEST,
    skipWaiting: true,
    clientsClaim: true,
    navigationPreload: true,
    runtimeCaching: [
        ...defaultCache,
        {
            matcher: /^https:\/\/fonts\.googleapis\.com\/.*/,
            handler: new StaleWhileRevalidate({
                cacheName: 'google-fonts-stylesheets',
            }),
        },
        {
            matcher: /^https:\/\/fonts\.gstatic\.com\/.*/,
            handler: new CacheFirst({
                cacheName: 'google-fonts-webfonts',
                plugins: [
                    new ExpirationPlugin({
                        maxEntries: 30,
                        maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
                    }),
                ],
            }),
        },
        {
            matcher: /^https:\/\/feed\.theplatform\.com.*/,
            handler: new CacheFirst({
                cacheName: 'remote-https-calls',
                plugins: [
                    new ExpirationPlugin({
                        maxEntries: 150,
                        maxAgeSeconds: 15 * 60, // 15 minutes
                    }),
                ],
            }),
        },
        {
            matcher: /^https?.*/,
            handler: new NetworkFirst({
                cacheName: 'https-calls',
                networkTimeoutSeconds: 15,
                plugins: [
                    new ExpirationPlugin({
                        maxEntries: 150,
                        maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
                    }),
                ],
            }),
        },
    ],
});
