// app.js

import { watchAuth } from "./auth.js";
import { getNotesFromDB, addNoteToDB } from "./firestore.js";

watchAuth(async (user) => {
    if (!user) {
        window.location.href = "auth/login.html";
        return;
    }

    // user is logged in → now load app
    notes = await getNotesFromDB();

    if (notes.length === 0) {
        await addNoteToDB({
            title: "Untitled Note",
            content: "",
            locked: false,
            password: null
        });

        notes = await getNotesFromDB();
    }

    renderNotes();
    loadNote(0);
});