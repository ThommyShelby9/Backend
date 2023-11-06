var express = require('express');
var router = express.Router();
const NoteController = require('../controllers/NoteController')
const NoteModel = require('../models/notes')
const StudentModel = require('../models/students')
const MatiereModel = require('../models/matieres')

router.post('/addNote', NoteController.addNote)

router.get('/notes/:userId', async function getNote(req, res, next){
    try {
        const userId = req.params.userId;
        const notes = await NoteModel.find({userId: userId})
        const notesWithNames = await Promise.all(notes.map(async note => {
            const matiere = await MatiereModel.findById(note.id_matiere);
            const student = await StudentModel.findById(note.id_student);
            
            return {
                student: {
                    firstname: student ? student.firstname : 'Étudiant introuvable',
                    lastname: student ? student.lastname : 'Étudiant introuvable'
                },
                matiere: {
                    nameMatiere: matiere ? matiere.nameMatiere : 'Matière introuvable'
                },
                note: note.note
            }
        }))
        const infos = {
            student:{
                firstname: notesWithNames.infosStudent
            }
        }
        res.status(200).send({notes, notesWithNames, infos})
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router