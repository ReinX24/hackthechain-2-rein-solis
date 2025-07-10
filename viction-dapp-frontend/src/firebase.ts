// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJU7YNeb5st1uhMbfRZzyXbTIC0EtbHZg",
  authDomain: "viction-dapp-frontend.firebaseapp.com",
  projectId: "viction-dapp-frontend",
  storageBucket: "viction-dapp-frontend.firebasestorage.app",
  messagingSenderId: "604843909941",
  appId: "1:604843909941:web:80312ee76b0d49df53227c",
  measurementId: "G-NWH772HPF5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default app;
