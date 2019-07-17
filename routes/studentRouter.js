var express = require('express');
var router = express.Router();

const upload = require('../modules/image_upload');

const studentService = require('../services/studentService');


router.post('/', upload.single('profilePicture'), makeNewStudent);
async function makeNewStudent(req, res, next) {
    res.status(201).send(await studentService.makeNewStudent(req.body, req.file));
}

router.get('/:studentId', getStudentProfile);
async function getStudentProfile(req, res, next) {
    let studentId = req.params.studentId;
    res.status(200).send(await studentService.findCertainStudent(studentId));
}

router.put('/:studentId', upload.single('profilePicture'), updateStudent);
async function updateStudent(req, res, next) {
    let studentId = req.params.studentId;
    res.status(201).send(await studentService.updateStudentUsingStudentId(studentId, req.body, req.file));
}

router.post('/:studentId/token', updateFcmToken);
async function updateFcmToken(req, res, next) {
    let studentId = req.params.studentId;
    res.status(201).send(await studentService.updateFcmTokenOfStudent(studentId, req.body));
}

router.get('/trainers/:studentId', getAllStudentOfTrainerAndSearching);
async function getAllStudentOfTrainerAndSearching(req, res, next) {
    let searchStudentName = req.query.studentName;
    res.status(200).send(await studentService.findAllStudentOfTrainerOrSearchedStudents(searchStudentName));
}


module.exports = router;