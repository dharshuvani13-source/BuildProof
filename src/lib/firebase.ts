import { initializeApp, getApps, getApp, type FirebaseOptions } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyBV2sA8X3r7b-P9aKj6i_T_d5gYzVf8l7Y",
  authDomain: "fb-studio-proj-7-dharshini.firebaseapp.com",
  projectId: "fb-studio-proj-7-dharshini",
  storageBucket: "fb-studio-proj-7-dharshini.appspot.com",
  messagingSenderId: "358002166652",
  appId: "1:358002166652:web:a668545833075ed5331d27"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { app, db, storage, auth };
