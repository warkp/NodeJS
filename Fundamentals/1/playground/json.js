// var obj = {
//     name: "Himanshu",
//     age: 24
// }

// var jsonString = JSON.stringify(obj);

// console.log(typeof jsonString);
// console.log(jsonString);

// var jsonString = '{"name":"Himanshu","age":24}';

// var obj = JSON.parse(jsonString);

// console.log(typeof obj);
// console.log(obj);

const fs = require("fs");

var originalNote = {
    title: "Some title",
    body: "Some body"
}

var originalNoteString = JSON.stringify(originalNote);

// write string format of above object in json using writeFileSync
fs.writeFileSync("notes.json",originalNoteString);

var noteString = fs.readFileSync("notes.json");

// convert noteString into note object
var note = JSON.parse(noteString);

// check var type
console.log(typeof note);
console.log(note);

