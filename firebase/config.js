// firebaseConfig.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBP348gdmS1BwngirO-5gmmDehg0MAmGlw",
  authDomain: "crm-app-d481f.firebaseapp.com",
  projectId: "crm-app-d481f",
  storageBucket: "crm-app-d481f.appspot.com",
  messagingSenderId: "85995835684",
  appId: "1:85995835684:web:05dd03c8bab09dd24a63b1",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const timestamp = serverTimestamp;

export { auth, firestore, timestamp };
