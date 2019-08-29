var express = require('express');
var router = express.Router();

const ptService = require('../services/ptService');

const logger = require('../config/logger');

router.get('/students/:studentId', getAllPtsOfStudent);
async function getAllPtsOfStudent(req, res, next) {
    let studentId = req.params.studentId;
    try {
        logger.info('[ptRouter] [getAllPtsOfStudent] find all pt list of student. studentId: %d', studentId);
        res.status(200).send(await ptService.findOnePtsOfStudentUsingStudentId(studentId));
    } catch (err) {
        next(err);
    }
}

router.get('/trainers/:trainerId', getAllPtsOfTrainer);
async function getAllPtsOfTrainer(req, res, next) {
    let trainerId = req.params.trainerId;
    try {
        logger.info('[ptRouter] [getAllPtsOfTrainer] find all pt list of trainer. trainerId: %d', trainerId);
        res.status(200).send(await ptService.findAllPtsOfTrainerUsingTrainerId(trainerId));
    } catch (err) {
        next(err);
    }
}

router.post('/', postNewPt);
async function postNewPt(req, res, next) {
    try {
        logger.info('[ptRouter] [postNewPt] create new pt');
        logger.info(req.body);
        res.status(200).send(await ptService.makeNewPt(req.body));
    } catch (err) {
        next(err);
    }
}


module.exports = router;