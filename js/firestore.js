// firestore.js

import { app } from "./firebase.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
    query,
    where
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const db = getFirestore(app);
const auth = getAuth(app);

/* GET CURRENT USER ID */
function getUserId() {
    return auth.currentUser?.uid;
}

/* ADD NOTE */
export async function addNoteToDB(note) {
    const userId = getUserId();

    await addDoc(collection(db, "notes"), {
        ...note,
        userId,
        createdAt: Date.now()
    });
}

/* GET NOTES */
export async function getNotesFromDB() {
    const userId = getUserId();

    const q = query(
        collection(db, "notes"),
        where("userId", "==", userId)
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
}

/* UPDATE NOTE */
export async function updateNoteInDB(note) {
    const ref = doc(db, "notes", note.id);
    await updateDoc(ref, {
        title: note.title,
        content: note.content,
        locked: note.locked,
        password: note.password
    });
}

/* DELETE NOTE */
export async function deleteNoteFromDB(id) {
    await deleteDoc(doc(db, "notes", id));
}