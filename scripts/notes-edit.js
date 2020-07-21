"use strict";

// creating these variables so that we can use them insted of writing document.querySelector all the time
const titleElement = document.querySelector("#note-title");
const dateElement = document.querySelector("#last-edited");
const bodyElement = document.querySelector("#note-body");
const removeElement = document.querySelector("#remove-note");

const noteId = location.hash.substring(1);
let notes = getSavedNotes();
let note = notes.find((note) => note.id === noteId);

if (!note) {
  location.assign("index.html");
}

// populating the note's title input with the existing value
titleElement.value = note.title;

// populating the dateElement
dateElement.textContent = generateLastEdited(note.updatedAt);

// populating the note's body input with the existing value
bodyElement.value = note.body;

// taking the new/edited title for the note title
titleElement.addEventListener("input", (e) => {
  note.title = e.target.value;
  note.updatedAt = moment().valueOf();
  dateElement.textContent = generateLastEdited(note.updatedAt);
  saveNotes(notes);
});

// taking the new/edited text for the note body
bodyElement.addEventListener("input", (e) => {
  note.body = e.target.value;
  note.updatedAt = moment().valueOf();
  dateElement.textContent = generateLastEdited(note.updatedAt);
  saveNotes(notes);
});

// do the following when remove note button is clicked
removeElement.addEventListener("click", (e) => {
  removeNote(note.id);
  saveNotes(notes);
  location.assign("index.html");
});

// syncing all the pages, reflecting in one page reflect on others
window.addEventListener("storage", (e) => {
  if (e.key === "notes") {
    notes = JSON.parse(e.newValue);
    let note = notes.find((note) => note.id === noteId);

    if (!note) {
      location.assign("index.html");
    }

    // populating the note's title input with the existing value
    titleElement.value = note.title;

    // populating the note's body input with the existing value
    bodyElement.value = note.body;
    dateElement.textContent = generateLastEdited(note.updatedAt);
  }
});
