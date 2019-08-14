var express = require('express');
var router = express.Router();

const upload = require('../modules/image_upload');

const studentService = require('../services/studentService');


router.post('/', upload.single('profilePicture'), makeNewStudent);
async function makeNewStudent(req, res, next) {
    try {
        res.status(201).send(await studentService.makeNewStudent(req.body, req.file));
    } catch (err) {
        next(err);
    }
}

router.get('/:studentId', getStudentProfile);
async function getStudentProfile(req, res, next) {
    let studentId = req.params.studentId;
    try {
        res.status(200).send(await studentService.findCertainStudent(studentId));
    } catch (err) {
        next(err);
    }
}

router.put('/:studentId', upload.single('profilePicture'), updateStudent);
async function updateStudent(req, res, next) {
    let studentId = req.params.studentId;
    try {
        res.status(204).send(await studentService.updateStudentUsingStudentId(studentId, req.body, req.file));
    } catch (err) {
        next(err);
    }
}

router.post('/:studentId/token', updateFcmToken);
async function updateFcmToken(req, res, next) {
    let studentId = req.params.studentId;
    try {
        res.status(201).send(await studentService.updateFcmTokenOfStudent(studentId, req.body));
    } catch (err) {
        next(err);
    }
}

router.get('/trainers/:trainerId', getAllStudentOfTrainerAndSearching);
async function getAllStudentOfTrainerAndSearching(req, res, next) {
    let trainerId = req.params.trainerId;
    let searchStudentName = req.query.studentName;
    try {
        res.status(200).send(await studentService.findAllStudentOfTrainerOrSearchedStudents(trainerId, searchStudentName));
    } catch (err) {
        next(err);
    }
}


module.exports = router;