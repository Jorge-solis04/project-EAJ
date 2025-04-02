// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js"
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBUgdZ-g2nB0cuBkx6b3Q7Bdgq_LIxUYo",
  authDomain: "tiendita-eaj.firebaseapp.com",
  projectId: "tiendita-eaj",
  storageBucket: "tiendita-eaj.firebasestorage.app",
  messagingSenderId: "863635231637",
  appId: "1:863635231637:web:4876c7100e252bfcd4dc9c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)
const auth = getAuth(app)

export {auth,db}