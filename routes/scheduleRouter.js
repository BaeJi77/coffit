var express = require('express');
var router = express.Router();

const scheduleService = require('../services/scheduleService');

const logger = require('../config/logger');

router.post('/', makeNewSchedule);
async function makeNewSchedule(req, res, next) {
    let iAm = req.body.is_trainer === true ? "trainer" : "student";
    try {
        logger.info('[scheduleRouter] [makeNewSchedule] make new schedule. It is requested to %s', iAm);
        logger.info(req.body);
        res.status(201).send(await scheduleService.makeNewSchedule(iAm, req.body));
    } catch (e) {
        next(e);
    }
}

router.put('/:scheduleId', updateSchedule);
async function updateSchedule(req, res, next) {
    let iAm = req.body.is_trainer === true ? "trainer" : "student";
    try {
        logger.info('[scheduleRouter] [updateSchedule] update schedule. It is requested to %s', iAm);
        logger.info(req.body);
        res.status(204).json(await scheduleService.updateScheduleWhenAcceptingOrRejecting(req.params.scheduleId, iAm, req.body));
    } catch (e) {
        next(e);
    }
}

router.delete('/:scheduleId', deleteSchedule);
async function deleteSchedule (req, res, next) {
    let scheduleId = req.params.scheduleId;
    try {
        logger.info('[scheduleRouter] [deleteSchedule] delete schedule. scheduleId: %d', scheduleId);
        let removeCnt = await scheduleService.deleteSchedule(scheduleId);
        if(removeCnt === 0)
            next(new Error('Not exist schedule id or already schedule removed'));

        res.status(200).json({
            state: 'success',
            removeCnt: result
        });
    } catch (e) {
        next(e);
    }
}

router.get('/trainers/:trainerId', getTrainerSchedule);
async function getTrainerSchedule (req, res, next) {
    let trainerId = req.params.trainerId;
    try {
        logger.info('[scheduleRouter] [getTrainerSchedule] find trainer schedule. trainerId: %d', trainerId);
        res.status(200).send(await scheduleService.findAllSchedulesOfTrainer(trainerId));
    } catch (e) {
        next(e);
    }
}

router.get('/students/:studentId', getStudentSchedule);
async function getStudentSchedule (req, res, next) {
    let studentId = req.params.studentId;
    try {
        logger.info('[scheduleRouter] [getStudentSchedule] find student schedule. studentId: %d', studentId);
        res.status(200).send(await scheduleService.findAllSchedulesOfStudent(studentId));
    } catch (e) {
        next(e);
    }
}

router.put('/memos/:scheduleId', updateScheduleMemo);
async function updateScheduleMemo(req, res, next) {
    let scheduleId = req.params.scheduleId;
    try {
        logger.info('[scheduleRouter] [updateScheduleMemo] update schedule memo. scheduleId: %d', scheduleId);
        logger.info(req.body);
        res.status(204).send(await scheduleService.updateSchedule(scheduleId, req.body));
    } catch (e) {
        next(e);
    }
}


module.exports = router;