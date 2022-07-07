import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD8lj24bLcln_EmcZHen_H7ANpYbUf-O08",
    authDomain: "react-otp-mbda.firebaseapp.com",
    projectId: "react-otp-mbda",
    storageBucket: "react-otp-mbda.appspot.com",
    messagingSenderId: "90347485331",
    appId: "1:90347485331:web:31c343b21ca59f7de03566",
    measurementId: "G-RGXHK5T93N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
