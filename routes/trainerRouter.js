var express = require('express');
var router = express.Router();

const trainerService = require('../services/trainerService');


router.get('/', getAllTrainerList);


async function getAllTrainerList(req, res, next) {
    res.status(200).send(await trainerService.findAllTrainersOrderByRecognition());
}


module.exports = router;
