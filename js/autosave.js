// autosave.js

function autoSave() {
    if (currentIndex === null) return;
    if (notes[currentIndex].locked) return;

    const currentContent = editor.innerHTML;
    const currentTitle = noteTitle.value || "Untitled Note";

    if (
        currentContent !== lastSavedContent ||
        currentTitle !== lastSavedTitle
    ) {
        saveStatus.textContent = "Saving...";

        notes[currentIndex].title = currentTitle;
        notes[currentIndex].content = currentContent;

        localStorage.setItem("notes", JSON.stringify(notes));

        lastSavedContent = currentContent;
        lastSavedTitle = currentTitle;

        renderNotes();

        saveStatus.textContent = "Saved";
    }
}

// autosave every 15 seconds
setInterval(autoSave, 15000);

// Save before exitinvg the browser or tab
window.addEventListener("beforeunload", autoSave);