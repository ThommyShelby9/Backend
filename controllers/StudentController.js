const StudentModel = require('../models/students')
const Counter = require('../models/counter')
async function getNextSequenceValue(sequenceName) {
    const sequenceDocument = await Counter.findOneAndUpdate(
      { id: Counter },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );
  
    return sequenceDocument.sequence_value;
  }

async function addStudent(req, res, next){
    const id = await getNextSequenceValue("studentId");
    const newStudent = new StudentModel ( {
        idStudent : id,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        old: req.body.old,
        gender: req.body.gender,
        userId : req.body.userId
    })

    try {
        const student = await newStudent.save()
        console.log(student)
        return res.status(201).send(student)
    } catch (error) {
        console.log(error)
        return res.status(400).send({message: error.message })
    }
}

module.exports = {addStudent}