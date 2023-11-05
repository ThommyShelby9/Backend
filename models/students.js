const mongoose = require('mongoose')

const StudentSchema = mongoose.Schema({
    id:{
        type: Number,
        require:true,
        unique:true
    },
    firstname: {
        type: String,
        require: true,
    },
    lastname: {
        type:String,
        require: true,
    },
    email:{
        type: String,
        require:true,
    },
    old:{
        type: Number,
        require: true,
    },
    gender:{
        type: String,
        require: true
    },
    userId: {
        type: Number,
        ref: 'user', 
        require: true
    }
})

const student = mongoose.model('student', StudentSchema)

module.exports = student