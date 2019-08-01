var express = require('express');
var router = express.Router();

const scheduleService = require('../services/scheduleService');


router.post('/', makeNewSchedule);
async function makeNewSchedule(req, res, next) {
    await scheduleService.makeNewSchedule(req.query.iAm, req.body)
        .then(result => {
            res.status(204).send(result);
        })
        .catch(err => {
            console.error(err);
            throw new Error(err);
        });
}

router.put('/:scheduleId', updateSchedule);
async function updateSchedule(req, res, next) {
    await scheduleService.updateScheduleWhenAcceptingOrRejecting(req.params.scheduleId, req.query.iAm, req.body)
        .then(result => {
            res.status(204).json(result);
        })
        .catch(err => {
            console.error(err);
            next(new Error(err));
        })
}

router.delete('/:scheduleId', deleteSchedule);
async function deleteSchedule (req, res, next) {
    await scheduleService.deleteSchedule(req.params.scheduleId)
        .then(result => {
            if(result === 0)
                next(new Error('Not exist schedule id or already schedule removed'));

            res.status(200).json({
                state: 'success',
                removeCnt: result
            });
        })
        .catch(err => {
            console.error(err);
            next(new Error(err));
        });
}

router.get('/trainers/:trainerId', getTrainerSchedule);
async function getTrainerSchedule (req, res, next) {
    await scheduleService.findAllSchedulesOfTrainer(req.params.trainerId)
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            console.error(err);
            throw new Error(err);
        });
}

router.get('/students/:studentId', getStudentSchedule);
async function getStudentSchedule (req, res, next) {
    await scheduleService.findAllSchedulesOfStudent(req.params.studentId)
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            console.error(err);
            throw new Error(err);
        });
}


module.exports = router;