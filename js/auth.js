import { app } from "./firebase.js";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const auth = getAuth(app);

/* SIGNUP */
export function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
}

/* LOGIN */
export function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}

/* LOGOUT */
export function logout() {
    return signOut(auth);
}

/* SESSION CHECK */
export function watchAuth(callback) {
    onAuthStateChanged(auth, callback);
}