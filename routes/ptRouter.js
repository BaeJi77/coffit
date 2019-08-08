var express = require('express');
var router = express.Router();

const ptService = require('../services/ptService');


router.get('/students/:studentId', getAllPtsOfStudent);
async function getAllPtsOfStudent(req, res, next) {
    let studentId = req.params.studentId;
    await ptService.findOnePtsOfStudentUsingStudentId(studentId)
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            console.error(err);
            next(new Error(err));
        });
}

router.get('/trainers/:trainerId', getAllPtsOfTrainer);
async function getAllPtsOfTrainer(req, res, next) {
    let trainerId = req.params.trainerId;
    await ptService.findAllPtsOfTrainerUsingTrainerId(trainerId)
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            console.error(err);
            next(new Error(err));
        });
}

router.post('/', postNewPt);
async function postNewPt(req, res, next) {
    await ptService.makeNewPt(req.body)
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            console.error(err);
            next(new Error(err));
        });
}


module.exports = router;