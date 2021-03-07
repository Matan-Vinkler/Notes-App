const chalk = require("chalk");
const yargs = require("yargs");
const notes = require("./notes");

yargs.version("1.1.0");

yargs.command({
    command: "add",
    describe: "Add a new note.",
    builder: {
        title: {
            describe: "Add Title",
            demandOption: true,
            type: "string"
        },
        body: {
            describe: "Add Body",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body);
    }
})

yargs.command({
    command: "remove",
    describe: "Remove a new note.",
    builder: {
        title: {
            describe: "Remove Title",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        notes.removeNote(argv.title);
    }
})

yargs.command({
    command: "list",
    describe: "List the notes.",
    handler() {
        notes.listNotes();
    }
})

yargs.command({
    command: "read",
    describe: "Read the notes.",
    builder : {
        title: {
            describe: "Read Title",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        notes.readNote(argv.title);
    }
})

yargs.parse();