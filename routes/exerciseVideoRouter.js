var express = require('express');
var router = express.Router();

const logger = require('../config/logger');

const exerciseVideoService = require('../services/exerciseVideoService');


router.post('/', makeNewExerciseVideo);
async function makeNewExerciseVideo (req, res, next) {
    try {
        logger.info('[exerciseVideoRouter] [makeNewExerciseVideo] make new exerciseVideo object.');
        logger.info(req.body);
        res.status(201).send(await exerciseVideoService.makeNewExerciseVideo(req.body));
    } catch (e) {
        next(e);
    }
}

router.put('/:exerciseVideoId', updateExerciseVideo);
async function updateExerciseVideo (req, res, next) {
    let exerciseVideoId = req.params.exerciseVideoId;
    try {
        logger.info('[exerciseVideoRouter] [updateExerciseVideo] update exerciseVideo. exerciseVideoId: %d', exerciseVideoId);
        logger.info(req.body);
        res.status(204).send(await exerciseVideoService.addTimeTag(exerciseVideoId, req.body));
    } catch (e) {
        next(e);
    }
}

router.put('/missions/:exerciseVideoId', updateMissionColumnWhenCompleteConverting);
async function updateMissionColumnWhenCompleteConverting (req, res, next) {
    let exerciseVideoId = req.params.exerciseVideoId;
    try {
        logger.info('[exerciseVideoRouter] [updateMissionColumnWhenCompleteConverting] update is_converted column to true in mission table . exerciseVideoId: %d', exerciseVideoId);
        res.status(204).send(await exerciseVideoService.updateIsConvertedValueWhenCompleteVideoConvert(exerciseVideoId));
    } catch (e) {
        next(e);
    }
}


router.delete('/:exerciseVideoId', deleteExerciseVideo);
async function deleteExerciseVideo (req, res, next) {
    let exerciseVideoId = req.params.exerciseVideoId;
    let missionId = req.query.missionId;
    try {
        logger.info('[exerciseVideoRouter] [deleteExerciseVideo] delete exerciseVideo. exerciseVideoId: %d, missionId: %d', exerciseVideoId, missionId);
        res.status(204).json(await exerciseVideoService.removeExerciseVideo(exerciseVideoId, missionId));
    } catch (e) {
        next(e);
    }
}


module.exports = router;