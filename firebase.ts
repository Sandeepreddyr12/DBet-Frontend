// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDCAtd8gW7k-LRgwmWRZGflOJ-Jtb-G-nI',
  authDomain: 'decent-bet-77c44.firebaseapp.com',
  projectId: 'decent-bet-77c44',
  storageBucket: 'decent-bet-77c44.appspot.com',
  messagingSenderId: '273522154270',
  appId: '1:273522154270:web:d07029a2964d912283070f',
  measurementId: 'G-CNT3WPCQML',
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

const app = getApps.length ? getApp : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
