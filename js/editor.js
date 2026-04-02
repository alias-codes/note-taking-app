// editor.js

const editor = document.getElementById("editor");
const noteTitle = document.getElementById("noteTitle");
const saveStatus = document.getElementById("saveStatus");

/* TEXT FORMAT */
function formatText(command, btn) {
    document.execCommand(command, false, null);
    btn.classList.toggle("active");
}

/* FONT SIZE */
function changeFontSize(size) {
    editor.style.fontSize = size + "px";
}

/* AUTO TITLE FROM CONTENT */
editor.addEventListener("input", () => {
    if (!noteTitle.value.trim()) {
        const text = editor.innerText.trim().split("\n")[0];
        noteTitle.value = text.slice(0, 20) || "Untitled Note";
    }
});

/* MARK UNSAVED */
editor.addEventListener("input", markUnsaved);
noteTitle.addEventListener("input", markUnsaved);

function markUnsaved() {
    saveStatus.textContent = "Unsaved...";
}

// Expose globally for HTML onclick attributes
window.formatText = formatText;
window.changeFontSize = changeFontSize;