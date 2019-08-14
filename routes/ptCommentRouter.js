var express = require('express');
var router = express.Router();

const ptCommentService = require('../services/ptCommentService');


router.post('/', createNewPtComment);
async function createNewPtComment(req, res, next) {
    await ptCommentService.createNewPtComment(req.body)
        .then(result => {
            res.status(201).send(result);
        })
        .catch(err => {
            next(err);
        })
}


module.exports = router;