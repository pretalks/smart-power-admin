import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDzpkc9Y82ov7I3sAgmgIXVEFggde7EcMc",
  authDomain: "smart-power-9d310.firebaseapp.com",
  projectId: "smart-power-9d310",
  storageBucket: "smart-power-9d310.firebasestorage.app",
  messagingSenderId: "892541452594",
  appId: "1:892541452594:web:6c50cd91eeeadcf8c6572b"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
