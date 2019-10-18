var express = require('express');
var router = express.Router();

const reviewService = require('../services/reviewService');

const logger = require('../config/logger');

router.post('/', makeNewReview);
async function makeNewReview(req, res, next) {
    try {
        logger.info('[reviewRouter] [makeNewReview] make new review.');
        logger.info(req.body);
        res.status(201).send(await reviewService.makeNewReview(req.body));
    } catch (e) {
        next(e);
    }
}

router.get('/:trainerId', getAllTrainerReviews);
async function getAllTrainerReviews(req, res, next) {
    let trainerId = req.params.trainerId;
    try {
        logger.info('[reviewRouter] [getAllTrainerReviews] find all reviews of trainer. trainerId: %d', trainerId);
        res.status(200).send(await reviewService.findAllReviewsOfTrainer(trainerId));
    } catch (e) {
        next(e);
    }
}

module.exports = router;