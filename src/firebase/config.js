import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  updateProfile,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';

// Replace with your Firebase config values
const firebaseConfig = {
  apiKey: "AIzaSyDdYVCeHIc3HD-IiFSntNLmemPI7nz4zkg",
  authDomain: "eagle-eye-9f1eb.firebaseapp.com",
  projectId: "eagle-eye-9f1eb",
  storageBucket: "eagle-eye-9f1eb.firebasestorage.app",
  messagingSenderId: "600451674098",
  appId: "1:600451674098:web:10edbdb442e6477f45056b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { 
  auth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  updateProfile,
  onAuthStateChanged,
  signOut
};