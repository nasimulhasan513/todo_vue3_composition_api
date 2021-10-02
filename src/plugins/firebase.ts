import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  /**
   * your firebase project configuration details
   */
};

const firebase = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const todoCollection = collection(db, "todos");
export default firebase;
