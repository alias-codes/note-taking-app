function lockCurrentNote() {
    if (currentIndex === null) return;
    document.getElementById("lockModal").classList.remove("hidden");
}

function closeLockModal() {
    document.getElementById("lockModal").classList.add("hidden");
}

function confirmLock() {
    const pass = document.getElementById("lockPassword").value;
    const confirm = document.getElementById("confirmPassword").value;

    if (!pass || pass !== confirm) {
        alert("Passwords do not match");
        return;
    }

    notes[currentIndex].password = pass;
    notes[currentIndex].locked = true;

    localStorage.setItem("notes", JSON.stringify(notes));

    editor.innerHTML = "";
    closeLockModal();
    renderNotes();
}

function closeUnlockModal() {
    document.getElementById("unlockModal").classList.add("hidden");
}

function confirmUnlock() {
    const input = document.getElementById("unlockPassword").value;

    const note = notes[currentIndex];

    if (input === note.password) {
        editor.innerHTML = note.content;
        closeUnlockModal();
    } else {
        alert("Wrong password");
    }
}

// Expose globally for HTML onclick attributes
window.lockCurrentNote = lockCurrentNote;
window.closeLockModal = closeLockModal;
window.confirmLock = confirmLock;
window.closeUnlockModal = closeUnlockModal;
window.confirmUnlock = confirmUnlock;