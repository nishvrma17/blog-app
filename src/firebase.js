import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDGxVHCTCria3mZg6RaeGfY6xIix_NgtnE",
  authDomain: "react-blog-app-67f5c.firebaseapp.com",
  projectId: "react-blog-app-67f5c",
  storageBucket: "react-blog-app-67f5c.firebasestorage.app",
  messagingSenderId: "576319978650",
  appId: "1:576319978650:web:88a0769f41d2c346267323",
  measurementId: "G-KRRVEVZ9W5"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { auth, db };