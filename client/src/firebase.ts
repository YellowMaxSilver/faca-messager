import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGmlk65hzEOTygeaeqQJcD56XXQ074pRY",
  authDomain: "reacttest-ac3fe.firebaseapp.com",
  projectId: "reacttest-ac3fe",
  storageBucket: "reacttest-ac3fe.firebasestorage.app",
  messagingSenderId: "391176630566",
  appId: "1:391176630566:web:73123de035a39736d8d1e7",
  measurementId: "G-GD1MWYJLRG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
export const firestore = getFirestore();
export const storage = getStorage();

export default app;