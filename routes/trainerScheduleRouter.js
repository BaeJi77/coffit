var express = require('express');
var router = express.Router();

const trainerScheduleService = require('../services/trainerScheduleService');

const logger = require('../config/logger');


router.post('/', makeNewTrainerSchedule);
async function makeNewTrainerSchedule(req, res, next) {
    try {
        logger.info('[trainerScheduleRouter] [makeNewTrainerSchedule] make new trainer schedule');
        logger.info(req.body.availableTime);
        res.status(201).send(await trainerScheduleService.makeNewTrainerAvailableDate(req.body.availableTime));
    } catch (e) {
        next(e);
    }
}

module.exports = router;