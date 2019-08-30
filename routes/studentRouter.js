var express = require('express');
var router = express.Router();

const studentService = require('../services/studentService');

const upload = require('../modules/image_upload');
const logger = require('../config/logger');


router.post('/', upload.single('profilePicture'), makeNewStudent);
async function makeNewStudent(req, res, next) {
    try {
        logger.info('[studentRouter] [makeNewStudent] make new student');
        logger.info(req.body);
        logger.info(req.file);
        res.status(201).send(await studentService.makeNewStudent(req.body, req.file));
    } catch (err) {
        next(err);
    }
}

router.get('/:studentId', getStudentProfile);
async function getStudentProfile(req, res, next) {
    let studentId = req.params.studentId;
    try {
        logger.info('[studentRouter] [getStudentProfile] find student detail. studentId: %d', studentId);
        res.status(200).send(await studentService.findCertainStudent(studentId));
    } catch (err) {
        next(err);
    }
}

router.put('/:studentId', upload.single('profilePicture'), updateStudent);
async function updateStudent(req, res, next) {
    let studentId = req.params.studentId;
    try {
        logger.info('[studentRouter] [updateStudent] update student information. studentId: %d', studentId);
        logger.info(req.body);
        logger.info(req.file);
        res.status(204).send(await studentService.updateStudentUsingStudentId(studentId, req.body, req.file));
    } catch (err) {
        next(err);
    }
}

router.post('/:studentId/token', setFcmToken);
async function setFcmToken(req, res, next) {
    let studentId = req.params.studentId;
    try {
        logger.info('[studentRouter] [setFcmToken] set fcm token. studentId : %d', studentId);
        logger.info(req.body);
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
        logger.info('[studentRouter] [getAllStudentOfTrainerAndSearching] find student of trainer sometime search studentName. studentName : %s', searchStudentName);
        res.status(200).send(await studentService.findAllStudentOfTrainerOrSearchedStudents(trainerId, searchStudentName));
    } catch (err) {
        next(err);
    }
}


module.exports = router;