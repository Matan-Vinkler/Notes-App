const fs = require("fs");
const chalk = require("chalk");

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync("notes.json", dataJSON);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync("notes.json");
        const dataJSON = dataBuffer.toString();

        return JSON.parse(dataJSON);
    }
    catch(e) {
        return [];
    }
}

const addNote = (title, body) => {
    const notes = loadNotes();
    //const dupNotes = notes.filter((note) => note.title === title);
    const dupNote = notes.find((note) => note.title === title);

    if(!dupNote) {
        notes.push({ title: title, body: body });
    
        saveNotes(notes);
        console.log(chalk.green.inverse("New notes added!"));
    }
    else {
        console.log(chalk.red.inverse("Note title taken"));
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    const dupNotes = notes.filter((note) => note.title !== title);

    if(dupNotes.length < notes.length) {
        saveNotes(dupNotes);
        console.log(chalk.green.inverse("Note removed!"));
    }
    else {
        console.log(chalk.red.inverse("No note found"));
    }
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.blue.bold("Your notes:"));

    notes.forEach(note => {
        console.log(chalk.blue(note.title));
    });
}

const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find((note) => note.title === title);

    if(note) {
        console.log(chalk.yellow.inverse(note.title) + "\n");
        console.log(note.body);
    }
    else
    {
        console.log(chalk.red.bold("No notes found!"));
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}