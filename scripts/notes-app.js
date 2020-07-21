"use strict";

const notes = getSavedNotes();

const filters = {
  // a var containing the user searched text
  searchText: "",
  sortBy: "byEdited",
};

// calling the function ourselves to show all the notes when the app runs for the first time
renderNotes(notes, filters);

//setting up eventListener for createNote button
document.querySelector("#createNote").addEventListener("click", (event) => {
  const id = uuidv4();
  const timestamp = moment().valueOf();

  notes.push({
    id: id,
    title: "",
    body: "",
    createdAt: timestamp,
    updatedAt: timestamp,
  });
  saveNotes(notes);
  location.assign(`edit.html#${id}`);
});

document.querySelector("#searchText").addEventListener("input", (e) => {
  filters.searchText = e.target.value;
  renderNotes(notes, filters);
});

document.querySelector("#filter-by").addEventListener("change", (e) => {
  filters.sortBy = e.target.value;
  renderNotes(notes, filters);
});

window.addEventListener("storage", (e) => {
  if (e.key === "notes") {
    notes = JSON.parse(e.newValue);
    renderNotes(notes, filters);
  }
});
