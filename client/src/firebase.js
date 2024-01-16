// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mernestate-76e41.firebaseapp.com",
  projectId: "mernestate-76e41",
  storageBucket: "mernestate-76e41.appspot.com",
  messagingSenderId: "429106327548",
  appId: "1:429106327548:web:e431a2c120ad9c38f80c79"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);