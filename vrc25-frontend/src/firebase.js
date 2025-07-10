// src/firebase.js

// Import the functions you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBijByHgQVX8Z1Wzzihcvj4XiL0jPoi6iM",
  authDomain: "vrc25-frontend.firebaseapp.com",
  projectId: "vrc25-frontend",
  storageBucket: "vrc25-frontend.firebasestorage.app",
  messagingSenderId: "549433052931",
  appId: "1:549433052931:web:76c2837a9f5113b594e336",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
