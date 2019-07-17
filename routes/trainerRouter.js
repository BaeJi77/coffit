var express = require('express');
var router = express.Router();

const upload = require('../modules/image_upload');
const fieldUpload = upload.fields([{name: 'profilePicture', maxCount: 1}, {name: 'activityPictures', maxCount: 3}]);

const trainerService = require('../services/trainerService');


router.get('/', getAllTrainerList);
async function getAllTrainerList(req, res, next) {
    res.status(200).send(await trainerService.findAllTrainersOrderByRecognition());
}

router.get('/:trainerId', getCertainTrainer);
async function getCertainTrainer(req, res, next) {
    let trainerId = req.params.trainerId;
    res.status(200).send(await trainerService.findCertainTrainer(trainerId));
}

router.post('/', fieldUpload, makeNewTrainer);
async function makeNewTrainer(req, res, next) {
    res.status(201).send(await trainerService.registerNewTrainer(req.body, req.files));
}

router.put('/:trainerId', fieldUpload, updateTrainer);
async function updateTrainer(req, res, next) {
    let trainerId = req.params.trainerId;
    res.status(201).send(await trainerService.updateTrainerProfile(trainerId, req.body, req.files))
}

router.post('/:trainerId/token', setFcmToken);
async function setFcmToken(req, res, next) {
    let trainerId = req.params.trainerId;
    res.status(201).send(await trainerService.updateFcmTokenOfTrainer(trainerId, req.body));
}


module.exports = router;
