import { initializeApp, getApps, getApp, type FirebaseOptions } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig: FirebaseOptions = {
  projectId: "studio-9691021057-703fb",
  appId: "1:133653110380:web:642fe15dc8a5f535248249",
  apiKey: "AIzaSyA42njvkdre_OKvqxtwH1JA9g8Tw4JsJew",
  authDomain: "studio-9691021057-703fb.firebaseapp.com",
  storageBucket: "studio-9691021057-703fb.appspot.com",
  messagingSenderId: "133653110380",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { app, db, storage, auth };
