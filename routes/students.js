var express = require('express');
var router = express.Router();
var StudentController = require('../controllers/StudentController')

router.post('/', StudentController.addStudent)

module.exports = router