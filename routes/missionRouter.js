var express = require('express');
var router = express.Router();

const missionService = require('../services/missionService');

const logger = require('../config/logger');

router.post('/', makeNewMission);
async function makeNewMission(req, res, next) {
    let ptId = req.query.ptId;
    try {
        logger.info('[missionRouter] [makeNewMission] make new mission, ptId: %d', ptId);
        logger.info(req.body);
        res.status(201).send(await missionService.makeNewMission(ptId, req.body));
    } catch (e) {
        next(e);
    }
}

router.get('/:missionId', getMissionDetail);
async function getMissionDetail(req, res, next) {
    try {
        let missionId = req.params.missionId;
        logger.info('[missionRouter] [getMissionDetail] get mission detail using mission id. missionId: %d', missionId);
        res.status(200).send(await missionService.findMissionDetail(missionId));
    } catch (e) {
        next(e);
    }
}

router.put('/:missionId', updateMission);
async function updateMission(req, res, next) {
    try {
        let missionId = req.params.missionId;
        logger.info('[missionRouter] [updateMission] update certain mission. missionId: %d', missionId);
        logger.info(req.body);
        res.status(204).send(await missionService.updateCommentAndRateInMission(missionId, req.body));
    } catch (e) {
        next(e);
    }
}

router.put('/hasVideos/:missionId', updateHasVideoColumn);
async function updateHasVideoColumn(req, res, next) {
    try {
        let missionId = req.params.missionId;
        let pastExerciseVideoId = req.query.pastExerciseVideoId;
        logger.info('[missionRouter] [updateHasVideoColumn] update has_video column in mission. missionId: %d', missionId);
        logger.info('pastExerciseVideoId: %d', pastExerciseVideoId);
        res.status(204).send(await missionService.updateHasVideoColumnAndCheckPastExerciseVideo(missionId, pastExerciseVideoId));
    } catch (e) {
        next(e);
    }
}

router.get('/students/:studentId', getMissionOfStudent);
async function getMissionOfStudent(req, res, next) {
    try {
        let studentId = req.params.studentId;
        logger.info('[missionRouter] [getMissionOfStudent] find all mission of target student. studentId: %d', studentId);
        res.status(200).send(await missionService.findAllMissionOfCertainStudent(studentId));
    } catch (e) {
        next(e);
    }
}

module.exports = router;