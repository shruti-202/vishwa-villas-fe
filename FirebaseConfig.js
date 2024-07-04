// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage"; // New Storage from firebase
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcjUXHlx22Zqp9Pdl_L_dEuiH751F9PdU",
  authDomain: "vishwa-villas-4ad0d.firebaseapp.com",
  databaseURL: "https://vishwa-villas-4ad0d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "vishwa-villas-4ad0d",
  storageBucket: "vishwa-villas-4ad0d.appspot.com",
  messagingSenderId: "788143996265",
  appId: "1:788143996265:web:78b42080b6e7067dd791f8",
  measurementId: "G-WX814VDFJD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const storage = getStorage(app);