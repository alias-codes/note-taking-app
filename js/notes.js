// CRUD operations
import { addNoteToDB, getNotesFromDB } from "./firestore.js";
import { updateNoteInDB } from "./firestore.js";
import { deleteNoteFromDB, getNotesFromDB as getNotesFromDB2 } from "./firestore.js";

const noteList = document.getElementById("noteList");

// create

async function createNote() {
    await addNoteToDB({
        title: "Untitled Note",
        content: "",
        locked: false,
        password: null
    });

    notes = await getNotesFromDB();

    currentIndex = notes.length - 1;

    renderNotes();
    loadNote(currentIndex);
}

// Load
function loadNote(index) {
    currentIndex = index;

    const note = notes[index];

    noteTitle.value = note.title;

    if (note.locked) {
        editor.innerHTML = "🔒 This note is locked";
        document.getElementById("unlockModal").classList.remove("hidden");
    } else {
        editor.innerHTML = note.content;
    }

    highlightActive();
}

// Save
async function saveNote() {
    if (currentIndex === null) return;

    notes[currentIndex].title = noteTitle.value || "Untitled Note";
    notes[currentIndex].content = editor.innerHTML;

    

    await updateNoteInDB(notes[currentIndex]);
    renderNotes();
}

// Delete 
async function deleteNote(index = currentIndex) {
    const note = notes[index];

    await deleteNoteFromDB(note.id);

    notes = await getNotesFromDB();

    if (notes.length === 0) {
        await createNote();
        return;
    }

    currentIndex = 0;

    renderNotes();
    loadNote(currentIndex);
}

// RENDER
function renderNotes() {
    noteList.innerHTML = "";

    notes.forEach((note, index) => {
        const div = document.createElement("div");
        div.className = "note-item";

        // TEXT (click → load)
        const titleSpan = document.createElement("span");
        titleSpan.innerText = note.locked ? "🔒 " + note.title : note.title;
        titleSpan.className = "note-title";
        titleSpan.onclick = () => loadNote(index);

        // DELETE BUTTON (🗑️)
        const deleteBtn = document.createElement("img");
        deleteBtn.src = "assets/images/delete.png";
        deleteBtn.className = "delete-btn";

        deleteBtn.onclick = (e) => {
            e.stopPropagation();
            openDeleteModal(index);
        };

        // ACTIVE STATE
        if (index === currentIndex) div.classList.add("active");

        div.appendChild(titleSpan);
        div.appendChild(deleteBtn);

        noteList.appendChild(div);
    });
    
}

/* HIGHLIGHT */
function highlightActive() {
    document.querySelectorAll(".note-item").forEach((item, i) => {
        item.classList.toggle("active", i === currentIndex);
    });
}

/* LIVE TITLE UPDATE */
noteTitle.addEventListener("input", () => {
    if (currentIndex === null) return;

    notes[currentIndex].title = noteTitle.value || "Untitled Note";
    renderNotes();
});

// Expose globally for HTML onclick attributes
window.createNote = createNote;
window.loadNote = loadNote;
window.saveNote = saveNote;
window.deleteNote = deleteNote;
window.renderNotes = renderNotes;
