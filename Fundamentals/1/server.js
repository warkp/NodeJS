const fs = require("fs");
const notes = require("./notes");
const _ = require("lodash");
const yargs = require("yargs");

const argv = yargs.argv;

// var command = process.argv[2];
// or
var command = argv._[0];

console.log("Yargs: ", argv);

if(command==='add'){
    console.log("Adding new note");
    var note = notes.addNote(argv.title, argv.body);
    if(note===undefined)
        console.log("File not added");
    else
        console.log("File added");
}
else if(command==='list')
    notes.getAll();
else if(command==='read'){
    console.log("Reading new note");
    notes.getNote(argv.title);
}
else if(command==='delete'){
    var noteRemoved = notes.deleteNote(argv.title);
    var message = noteRemoved ? "Note is removed" : "Note is not removed";
    console.log(message);
}
else
    console.log("Command note recognized");

    

