var express = require('express');
var router = express.Router();

const ptCommentService = require('../services/ptCommentService');

const logger = require('../config/logger');

router.post('/', createNewPtComment);
async function createNewPtComment(req, res, next) {
    try {
        logger.info('[ptCommentRouter] [createNewPtComment] make new PTComment');
        logger.info(req.body);
        res.status(201).send(await ptCommentService.createNewPtComment(req.body));
    } catch (e) {
        next(e);
    }
}

router.put('/:ptCommentId', updatePtComment);
async function updatePtComment(req, res, next) {
    let ptCommentId = req.params.ptCommentId;
    try {
        logger.info('[ptCommentRouter] [updatePtComment] update PTComment. ptCommentId: %d', ptCommentId);
        logger.info(req.body);
        res.status(204).send(await ptCommentService.updatePtComment(ptCommentId, req.body));
    } catch (e) {
        next(e);
    }
}


module.exports = router;