var express = require('express');
var router = express.Router();

const trainerService = require('../services/trainerService');


router.get('/', getAllTrainerList);
router.post('/', makeNewTrainer);
router.get('/:trainerId', getCertainTrainer);
router.put('/:trainerId', updateTrainer);
router.post('/:trainerId', setFCMToken);


async function getAllTrainerList(req, res, next) {
    res.status(200).send(await trainerService.findAllTrainersOrderByRecognition());
}


async function getCertainTrainer(req, res, next) {
    let trainerId = req.params.trainerId;
    res.status(200).send(await trainerService.findCertainTrainer(trainerId));
}

async function makeNewTrainer(req, res, next) {
    res.status(201).send(await trainerService.registerNewTrainer())
}

async function updateTrainer(req, res, next) {
    let trainerId = req.params.trainerId;
    res.status(204).send(await trainerService.updateTrainerBySelf(trainerId, req.body))
}

async function setFCMToken(req, res, next) {
    let trainerId = req.params.trainerId;
    res.status(201).send(await trainerService.updateFCMTokenOfTrainer(trainerId, req.body));
}


module.exports = router;
