// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDX2MDU6kENC7zTE15t1BHc2WRlnkuJkQo",
  authDomain: "navigo-ai-travel-planner.firebaseapp.com",
  projectId: "navigo-ai-travel-planner",
  storageBucket: "navigo-ai-travel-planner.firebasestorage.app",
  messagingSenderId: "10175992079",
  appId: "1:10175992079:web:7646990fe3eeb3cae3ae7a",
  measurementId: "G-P3RC6LJHP0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 
//const analytics = getAnalytics(app);