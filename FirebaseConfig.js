// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage"; // New Storage from firebase
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvU01vjJ269ukxtg07KCEN6WDYe9dNduc",
  authDomain: "vishwa-villas-b09e0.firebaseapp.com",
  databaseURL: "https://vishwa-villas-b09e0-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "vishwa-villas-b09e0",
  storageBucket: "vishwa-villas-b09e0.appspot.com",
  messagingSenderId: "997311223686",
  appId: "1:997311223686:web:4cf162d3c6de7060eebe07",
  measurementId: "G-SMW39D87YM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const storage = getStorage(app);