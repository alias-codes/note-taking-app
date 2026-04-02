// media.js

const mediaInput = document.getElementById("mediaInput");

mediaInput.addEventListener("change", handleMediaInsert);

function handleMediaInsert(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {
        let element;

        const fileType = file.type;

        if (fileType.startsWith("image/")) {
            element = document.createElement("img");
        } 
        else if (fileType.startsWith("audio/")) {
            element = document.createElement("audio");
            element.controls = true;
        } 
        else if (fileType.startsWith("video/")) {
            element = document.createElement("video");
            element.controls = true;
        } 
        else {
            alert("Unsupported file type");
            return;
        }

        element.src = e.target.result;

        element.style.maxWidth = "100%";
        element.style.display = "block";
        element.style.marginTop = "10px";
        element.style.resize = "both";

        editor.appendChild(element);
    };

    reader.readAsDataURL(file);

    // reset input so same file can be selected again
    event.target.value = "";
}