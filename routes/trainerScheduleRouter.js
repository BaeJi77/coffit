var express = require('express');
var router = express.Router();

const trainerScheduleService = require('../services/trainerScheduleService');

router.post('/', makeNewTrainerSchedule);
async function makeNewTrainerSchedule(req, res, next) {
    await trainerScheduleService.makeNewTrainerAvailableDate(req.body)
        .then(trainerSchedules => {
            res.status(201).send(trainerSchedules);
        })
        .catch(err => {
            next(err);
        })
}

module.exports = router;