import {precacheAndRoute} from 'workbox-precaching';
import {registerRoute} from 'workbox-routing';
import {CacheFirst, StaleWhileRevalidate} from 'workbox-strategies';
import {ExpirationPlugin} from 'workbox-expiration';
import {skipWaiting, clientsClaim} from 'workbox-core';

skipWaiting();
clientsClaim();

// caching file asset
precacheAndRoute(self.__WB_MANIFEST);

// caching google font
registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    new StaleWhileRevalidate({
      cacheName: "google-fonts-stylesheets"
    })
);

// caching file font
registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    new CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
          new ExpirationPlugin({
            maxAgeSeconds: 30 * 24 * 60 * 60
          })
        ]
    })
);

// caching dari football-data.org api
registerRoute(
    /^https:\/\/api\.football-data\.org\/v2/,
    new StaleWhileRevalidate({
        cacheName: "football-data-api"
    })
);

// event push notification
self.addEventListener('push', event => {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  const options = {
    body: body,
    icon: './img/notifIcon.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Hello Football Lovers!', options)
  );
});
