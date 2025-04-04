import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getFirestore, collection, query, where, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-messaging.js";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const messaging = getMessaging(app);

let lastNotificationId = null;

// Registrar el Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/js/firebase-messaging-sw.js")
    .then((registration) => {

    })
    .catch((error) => {

    });
}

async function tokenExiste(token) {
  const q = query(collection(db, "tokens"), where("token", "==", token));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
}

async function guardarToken(token) {
  if (await tokenExiste(token)) {

    return;
  }
  
  try {
    await addDoc(collection(db, "tokens"), { token });

  } catch (e) {

  }
}

async function obtenerYGuardarToken() {
  try {
    const registration = await navigator.serviceWorker.ready;
    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      serviceWorkerRegistration: registration, 
    });

    if (token) {

      await guardarToken(token);
    } else {

    }
  } catch (error) {

  }
}

/*
//boton flotante notis y obtencion token
window.addEventListener("DOMContentLoaded", () => {
  const notificacion = document.querySelector(".notificacion");

  if (Notification.permission === "granted") {
    obtenerYGuardarToken();
    notificacion.style.display = "none"; 
  } else if (Notification.permission === "denied") {
    console.warn("❌ El usuario ya denegó los permisos de notificación.");
  }
});

document.querySelector(".texto__notificacion").addEventListener("click", () => {
  Notification.requestPermission().then(permiso => {
    if (permiso === "granted") {
      new Notification("¡Gracias por suscribirte a nuestras notificaciones!");
      document.querySelector(".notificacion").style.display = "none"; // Ocultar sin recargar
    }
  });
});
*/


//pemiso sin bootn
window.addEventListener("DOMContentLoaded", async () => {
  if (Notification.permission === "granted") {
    obtenerYGuardarToken();
  } else if (Notification.permission === "denied") {

  } else {
    const permiso = await Notification.requestPermission();
    if (permiso === "granted") {
      obtenerYGuardarToken();
    } else {

    }
  }
});




// Notificaciones en primer plano
onMessage(messaging, (payload) => {


  const { title, body, icon, image, click_action, notification_id } = payload.data || {};

  if (notification_id === lastNotificationId) {

    return;
  }
  lastNotificationId = notification_id;

  const notificationOptions = { body, icon, image };

  const notification = new Notification(title, notificationOptions);
  notification.onclick = () => {
    window.open(click_action, "_blank");
  };
});
