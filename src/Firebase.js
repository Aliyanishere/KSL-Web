import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { addDoc, collection, doc, onSnapshot, setDoc, getDoc, query } from "firebase/firestore";

import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB5mqn5LsJrfUcvwBFT06IQLCaHJ8oe-5U",
  authDomain: "ksl-admin-60dff.firebaseapp.com",
  projectId: "ksl-admin-60dff",
  storageBucket: "ksl-admin-60dff.appspot.com",
  messagingSenderId: "970810760443",
  appId: "1:970810760443:web:6017bc684e9aacb12ba45e",
  measurementId: "G-354GGB3CPY"
};

initializeApp(firebaseConfig)

const db = getFirestore();

export { db, getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, addDoc, collection, doc, onSnapshot, setDoc, getDoc, query }
