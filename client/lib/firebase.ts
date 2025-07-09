import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration - Replace with your config
const firebaseConfig = {
  apiKey: "AIzaSyB_6ra1ztLgHmnTVGuQP7uwzqzGebCrRw0",
  authDomain: "hackorbit-8a3e4.firebaseapp.com",
  projectId: "hackorbit-8a3e4",
  storageBucket: "hackorbit-8a3e4.firebasestorage.app",
  messagingSenderId: "729997646460",
  appId: "1:729997646460:web:5c188f68b62a117d3d07f9",
  measurementId: "G-8P3XYQ3QKZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
