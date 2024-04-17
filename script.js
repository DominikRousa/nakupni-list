document.addEventListener("DOMContentLoaded", function () {
    const noteInput = document.getElementById("noteInput");
    const countInput = document.getElementById("countInput");
    const saveNoteBtn = document.getElementById("saveBtn");
    const notesContainer = document.getElementById("notesContainer");
    
    loadNotes();
    
    saveNoteBtn.addEventListener("click", function () {
        const noteText = noteInput.value.trim();
        const noteCount = countInput.value.trim();
        if (noteText !== "") {
            saveNoteToLocalStorage(noteText, noteCount);
            noteInput.value = "";
        }
    });
    
    function saveNoteToLocalStorage(text, count) {
        const timestamp = new Date().toLocaleString();
        const note = { text: text, count: count };
        let notes = JSON.parse(localStorage.getItem("notes")) || [];
        notes.push(note);
        localStorage.setItem("notes", JSON.stringify(notes));
        loadNotes();
    } 

    function loadNotes() {
        notesContainer.innerHTML = "";
        const notes = JSON.parse(localStorage.getItem("notes")) || [];
        notes.forEach(function (note, index) {
            const noteElement = document.createElement("div");
            noteElement.classList.add("note");
            noteElement.innerHTML = `
                <p>${note.text}</p>
                <p>Počet: ${note.count}</p>
                <button onclick="checkNote(${index})">Dokonceno</button>
                <button onclick="editNote(${index})">Upravit</button>
                <button onclick="deleteNote(${index})">Odstranit</button>
            `;
            notesContainer.appendChild(noteElement);
        });
    }

    window.checkNote = function (index) {
        const notes = JSON.parse(localStorage.getItem("notes")) || [];
        notes.style.backgroundColor = "green";
    };

    window.editNote = function (index) {
        const notes = JSON.parse(localStorage.getItem("notes")) || [];
        const editedNote = prompt("Edit the note:", notes[index].text);
        if (editedNote !== null) {
            notes[index].text = editedNote;
            localStorage.setItem("notes", JSON.stringify(notes));
            loadNotes();
        }
    };

    window.deleteNote = function (index) {
        const notes = JSON.parse(localStorage.getItem("notes")) || [];
        notes.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notes));
        loadNotes();
    };
});