// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDOwuQBjOM1YL6o2hiW_OIA4Typw0vb4vw",
  authDomain: "ipsscienceexibition.firebaseapp.com",
  projectId: "ipsscienceexibition",
  storageBucket: "ipsscienceexibition.firebasestorage.app",
  messagingSenderId: "486200491667",
  appId: "1:486200491667:web:85cac72cb2b0839f175766",
  measurementId: "G-THQGFD4ZCK"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);