const express = require('express');
const router = express.Router();

const chattingRoomService = require('../services/chattingRoomService');

const logger = require('../config/logger');

router.get('/trainers/:trainerId', getTrainerChattingRoomList);
async function getTrainerChattingRoomList(req, res, next) {
    let trainerId = req.params.trainerId;
    logger.info('[chattingRoomRouter] [getTrainerChattingRoomList] get trainer chatting list. trainerId: %d', trainerId);
    try {
        res.status(200).send(await chattingRoomService.getChattingRoomListForTrainer(trainerId));
    } catch (e) {
        next(e);
    }
}

router.get('/students/:studentId', getStudentChattingRoomList);
async function getStudentChattingRoomList(req, res, next) {
    let studentId = req.params.studentId;
    logger.info('[chattingRoomRouter] [getStudentChattingRoomList] get student chatting list. studentId: %d', studentId);
    try {
        res.status(200).send(await chattingRoomService.getChattingRoomListForStudent(studentId));
    } catch (e) {
        next(e);
    }
}

module.exports = router;