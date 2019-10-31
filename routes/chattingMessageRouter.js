var express = require('express');
var router = express.Router();

const logger = require('../config/logger');

const chattingMessageService = require('../services/chattingMessageService');


router.get('/:chattingRoomId', findAllChattingMessageOfChattingRoom);
async function findAllChattingMessageOfChattingRoom(req, res, next) {
    let iAm = req.query.iAm;
    let chattingRoomId = req.params.chattingRoomId;
    logger.info('[chattingMessageRouter] [findAllChattingMessageOfChattingRoom] find all chatting message in target chatting room. chattingRoomId: %d, iAm: %s', chattingRoomId, iAm);
    try {
        res.status(200).send(await chattingMessageService.getAllChattingMessageAndMakeReadAllMessage(chattingRoomId, iAm));
    } catch (e) {
        next(e);
    }
}


module.exports = router;