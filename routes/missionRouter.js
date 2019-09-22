var express = require('express');
var router = express.Router();

const missionService = require('../services/missionService');

const logger = require('../config/logger');

router.post('/', makeNewMission);
async function makeNewMission(req, res, next) {
    try {
        logger.info('[missionRouter] [makeNewMission] make new mission');
        logger.info(req.body);
        res.status(201).send(await missionService.makeNewMission(req.body));
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