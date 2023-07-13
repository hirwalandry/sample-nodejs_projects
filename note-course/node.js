const file = require("fs");
const chalk = require("chalk");

// adding a note!!!

const addNotes = (title, body) => {
    const notes = loadNotes();

    const noDuplication = notes.find((note) => note.title === title);

    if (!noDuplication) {
        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes);
        console.log(chalk.green.inverse("a note added!"));
    }
    else{
        console.log(chalk.red.inverse("no duplication!!"));
    }
 

}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    const dataSave = file.writeFileSync("notes.json", dataJSON)
}

const loadNotes = () => {
    try {
        const BufferData = file.readFileSync("notes.json");
        const dataJSON= BufferData.toString();
        return JSON.parse(dataJSON);
    } catch (error) {
        return [];
    }
}

//removing a note!!!

const removeNote = (title) => {
    const notes = loadNotes();

    const notesToKeep = notes.filter((note) => note.title !== title);

    if (notes.length > notesToKeep.length) {

        console.log(chalk.green.inverse("a note removed!"));
        saveNotes(notesToKeep);
        
    }
    else{
        console.log(chalk.red.inverse("not found!!"));
    }
}

// listing all notes!!!

const listNotes = () => {
    const notes = loadNotes();

    console.log(chalk.inverse("list of all notes: "));
    notes.forEach((note) => {
        console.log("the title: " + note.title + " the body: " + note.body);     
    });

}

//read a note

const readNote = (title) => {
    
    const notes = loadNotes();

    const findNote = notes.find((note) => note.title === title);
    
    if (findNote) {
        console.log(chalk.green.inverse("here is a note your searching:"));
        console.log(findNote.title, findNote.body);
    }
    else{
        console.log(chalk.red.inverse("not found!!"))
    }
}
module.exports = {
    addNotes : addNotes,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}