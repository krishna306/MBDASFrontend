import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA5SWHzw3Qrbmg-TqEcRjglT-W8JtJ5GhE",
  authDomain: "mbdas-376cf.firebaseapp.com",
  projectId: "mbdas-376cf",
  storageBucket: "mbdas-376cf.appspot.com",
  messagingSenderId: "1060619051599",
  appId: "1:1060619051599:web:75e42e0e49c5d9bad9403a",
  measurementId: "G-WKB7XJ7G59"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
