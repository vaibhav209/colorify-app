import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCxnqeWtbshyj1AE0yUY3S2CEdwf6SE5qw",
  authDomain: "auth-dev-6b6d5.firebaseapp.com",
  projectId: "auth-dev-6b6d5",
  storageBucket: "auth-dev-6b6d5.appspot.com",
  messagingSenderId: "134882774862",
  appId: "1:134882774862:web:bc7c6588bd830dc0ae181f"
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);

const db = getFirestore(app);

export { db };
