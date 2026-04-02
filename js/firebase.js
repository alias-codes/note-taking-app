// Import Firebase (modular SDK)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

const firebaseConfig = { 
    apiKey: "AIzaSyDLtXfcqS-nCIQpgLbRnbpmwGvUNyIDoaE", 
    authDomain: "note-taking-app-77863.firebaseapp.com", 
    projectId: "note-taking-app-77863", 
    storageBucket: "note-taking-app-77863.firebasestorage.app", 
    messagingSenderId: "308546784036", 
    appId: "1:308546784036:web:38fa3c952c5e2c7545c1b1", 
    measurementId: "G-RQPLJ860ZT" 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };