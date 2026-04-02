let deleteIndex = null;

const modal = document.getElementById("deleteModal");
const confirmBtn = document.getElementById("confirmDelete");
const cancelBtn = document.getElementById("cancelDelete");

/* OPEN MODAL */
function openDeleteModal(index) {
    deleteIndex = index;
    modal.classList.remove("hidden");
}

/* CLOSE MODAL */
function closeDeleteModal() {
    modal.classList.add("hidden");
    deleteIndex = null;
}

/* CONFIRM DELETE */
confirmBtn.onclick = () => {
    if (deleteIndex !== null) {
        deleteNote(deleteIndex);
    }
    closeDeleteModal();
};

/* CANCEL */
cancelBtn.onclick = closeDeleteModal;

/* CLICK OUTSIDE TO CLOSE */
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        closeDeleteModal();
    }
});

// Expose globally for HTML onclick attributes
window.openDeleteModal = openDeleteModal;