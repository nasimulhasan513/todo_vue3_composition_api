import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCkgH_NunnndHDNydIWyhF2hxFnf0kytxQ",
  authDomain: "fbclone-4d6d9.firebaseapp.com",
  databaseURL: "https://fbclone-4d6d9.firebaseio.com",
  projectId: "fbclone-4d6d9",
  storageBucket: "fbclone-4d6d9.appspot.com",
  messagingSenderId: "926065359623",
  appId: "1:926065359623:web:1f9cb87fd2b6e913ec63a2",
};

const firebase = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const todoCollection = collection(db, "todos");
export default firebase;
