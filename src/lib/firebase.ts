// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyA4fZcJiYY8h6k6_UN8XJEYvZJOkydxfGI",
  authDomain: "stable-scout-3.firebaseapp.com",
  projectId: "stable-scout-3",
  storageBucket: "stable-scout-3.appspot.com",
  messagingSenderId: "756412804307",
  appId: "1:756412804307:web:241c63c2099db8954d7826",
  measurementId: "G-1HNV6JSJXW"
};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);