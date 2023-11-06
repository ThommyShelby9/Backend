const NoteModel = require('../models/notes')

async function addNote(req, res, next){
    const newNote = NoteModel({
        id_student: req.body.id_student,
        id_matiere: req.body.id_matiere,
        note: req.body.note,
        userId: req.body.userId
    })

    try {
        const note = await newNote.save()
        console.log(note)
        res.status(201).send(note)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
}


module.exports = {addNote}