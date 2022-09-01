import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBvAVt4pQKUWPFnmbTJt7Pl-K-CMJaLQPI",
  authDomain: "bk-technology-103e1.firebaseapp.com",
  projectId: "bk-technology-103e1",
  storageBucket: "bk-technology-103e1.appspot.com",
  messagingSenderId: "625821689858",
  appId: "1:625821689858:web:929f70d0b2b925bcb3df1b",
  measurementId: "G-CCM9SLFDVE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);