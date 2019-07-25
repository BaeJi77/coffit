var express = require('express');
var router = express.Router();

const trainerScheduleService = require('../services/trainerScheduleService');

router.post('/', makeNewTrainerSchedule);
async function makeNewTrainerSchedule(req, res, next) {
    res.status(201).send(await trainerScheduleService.makeNewTrainerAvailableDate(req.body));
}

module.exports = router;