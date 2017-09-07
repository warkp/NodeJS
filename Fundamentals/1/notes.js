console.log("Starting notes.js");
const fs = require("fs");

var fetchNote = ()=>{
    try{
        // read data from file using readFileSync
        var noteString = fs.readFileSync("notes-data.json");
        // parse data into object and store it in the array
        return JSON.parse(noteString);
    } catch (e){
        return [];
    }
}

var saveNote = (notes)=>{
    fs.writeFileSync("notes-data.json",JSON.stringify(notes));
}

var addNote = (title,body)=>{
    // array to store all data
    var notes = fetchNote();
    // note object to store note from parameter of function
    var note = {
        title,
        body
    };
    
    // check if the current title matches any other title in the file
    var duplicateNotes = notes.filter((note)=>note.title===title);

    if(duplicateNotes.length===0){
        notes.push(note);
        saveNote(notes);
        return note;
    }
}

var getAll = ()=>{
    console.log("Listing all note");
}

var getNote = (title)=>{
    console.log("Getting note titled ", title);
}

var deleteNote = (title)=>{
    // fetch notes
    var notes = fetchNote();

    // filter notes
    var filterNotes = notes.filter((note)=>note.title !== title);

    // save notes
    saveNote(filterNotes);

    return notes.length !== filterNotes.length;
}

module.exports = {
  addNote,
  getAll,
  getNote,
  deleteNote    
}
