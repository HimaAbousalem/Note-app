const fs = require('fs')
const chalk = require('chalk')

const readNote= (title)=>{
    const notes = loadNotes()
    const note = notes.find((note)=>note.title == title)
    if(note){
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    }else console.log(chalk.red.inverse('No Note Found!'))
}

const addNote =(title, body)=>{
    const notes = loadNotes()
    const duplicateNote = notes.find((note)=>note.title == title)
    debugger
    if(!duplicateNote){
    notes.push({title: title, body: body}) 
    saveNotes(notes)
    console.log(chalk.green.inverse('Note added successfully.'))
    }else console.log(chalk.red.inverse('Note title is taken!'))
}

const saveNotes= (notes)=> fs.writeFileSync('notes.json',JSON.stringify(notes))

const loadNotes = ()=>{
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }catch(e){
        return []
    }
}

const removeNote = (title)=>{
     const notes = loadNotes()
     const notesToKeep = notes.filter((note)=>note.title != title)
     if(notes.length > notesToKeep.length){
         console.log(chalk.green.inverse('Note Removed'))
         saveNotes(notesToKeep)
     }else{
        console.log(chalk.red.inverse('No Note Found'))
     }
}

const listNotes = ()=>{
    const notes = loadNotes()
    if(notes.length>0) console.log(chalk.inverse('Your Notes: '))
    else console.log(chalk.red.inverse('No Notes Found!'))
    notes.forEach(note => {
        console.log(note.title)
    });
}

module.exports = {
    readNote: readNote,
    addNote: addNote,
    listNotes: listNotes,
    removeNote: removeNote
}