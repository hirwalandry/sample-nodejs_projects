const yargs = require("yargs");
const actionOnAllCommand = require('./node.js');

yargs.command({
    command: "add",
    description: "adding a note",
    builder: {
        title:{
            description: "a note title",
            demandOption: true,
            type: "string"
        },
        body: {
            description: "a note body",
            demandOption: true,
            type: "string"

        }

    },
    handler(argv) {

        actionOnAllCommand.addNotes(argv.title, argv.body);
    }
})

yargs.command({
    command: "remove",
    description: "removing a note",
    builder: {
        title:{
            description: "remove a note",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv){

        actionOnAllCommand.removeNote(argv.title);
    }
})

yargs.command({
    command: "list",
    description: "listing all notes",
    handler(){

        actionOnAllCommand.listNotes();
    }
})

yargs.command({
    command: "read",
    description: "reading a note",
    builder: {
        title:{
            description: "read a note",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv){
        actionOnAllCommand.readNote(argv.title);
    }
})


yargs.parse();