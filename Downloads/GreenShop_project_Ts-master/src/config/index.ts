import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDoN8LjVfuR9gT4-GU2Z_8bBq2jAqRXZyY",
  authDomain: "green-shopn14.firebaseapp.com",
  projectId: "green-shopn14",
  storageBucket: "green-shopn14.firebasestorage.app",
  messagingSenderId: "943253582980",
  appId: "1:943253582980:web:89143bed95c478a50abed1",
  measurementId: "G-WJNLXJEN02",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signInWithGoogle = () => {
  return signInWithPopup(auth, provider);
};
export { signInWithGoogle };
