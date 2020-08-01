import "materialize-css/dist/js/materialize.min.js";
import "materialize-css/dist/css/materialize.min.css";
import "./assets/css/style.css";
import "./assets/js/db.js";
import navigation from "./assets/js/nav.js";
import favicon from "./assets/img/favicon.png";
import notifIcon from "./assets/img/notifIcon.png";
import "./assets/js/saveMatch.js";
import "./assets/js/deleteMatch.js";

// mendaftar service worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js")
    .then((reg) => console.log("ServiceWorker registered: ", reg))
    .catch((regErr) => console.log("ServiceWorker registration failed: ", regErr));
  });
} else {
  console.log("ServiceWoker not supported this browser");
};

// request permision untuk push notification
if ('Notification' in window) {
  Notification.requestPermission().then(result => {
    if (result === "denied") {
      console.log("Notification feature denied!");
      return;
    } else if (result === "default") {
      console.error("User close request permission notification box");
      return;
    }

    navigator.serviceWorker.ready.then(() => {
      if (('PushManager' in window)) {
        navigator.serviceWorker.getRegistration().then(registration => {
            registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array("BIEa38_Pc_vMakwbXU4qPwF0je39bhWugNfb1DBM3KIiHK0r4IVPH9sr6o2g74pKI49p6Qd2ts11iBEA7uCqYBc")
            }).then(subscribe => {
                console.log('Subscribe succsessfully with endpoint: ', subscribe.endpoint);
                console.log('Subscribe succsessfully with p256dh key: ', btoa(String.fromCharCode.apply(
                    null, new Uint8Array(subscribe.getKey('p256dh')))));
                console.log('Subscribe succsessfully with auth key: ', btoa(String.fromCharCode.apply(
                    null, new Uint8Array(subscribe.getKey('auth')))));
            }).catch(err => {
                console.error('Subscribe failure ', err.message);
            });
        });
      }
    });
  });
}

//  function untuk convert vapid public key
const urlBase64ToUint8Array = base64String => {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

document.addEventListener("DOMContentLoaded", navigation);
