var express = require('express');
var router = express.Router();

const logger = require('../config/logger');

var dummyData = {id: 1, title: '너무 좋아요!!', contents: '이 선생님 진짜 짱임', star: 5, created_at: '2019-10-10 15:20:30', updated_at: '2019-10-10 15:20:30', student_id: 1, trainer_id: 1};


router.post('/', makeNewReview);
async function makeNewReview(req, res, next) {
    try {
        logger.info('[reviewRouter] [makeNewReview] make new review.');
        logger.info(req.body);
        res.status(201).send(dummyData);
    } catch (e) {
        next(e);
    }
}

router.get('/:trainerId', getAllTrainerReviews);
async function getAllTrainerReviews(req, res, next) {
    let trainerId = req.params.trainerId;
    try {
        logger.info('[reviewRouter] [getAllTrainerReviews] find all reviews of trainer. trainerId: %d', trainerId);
        let dummyArray = [];
        dummyArray.push(dummyData);
        res.status(200).send(dummyArray);
    } catch (e) {
        next(e);
    }
}

module.exports = router;