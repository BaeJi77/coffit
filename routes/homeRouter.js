var express = require('express');
var router = express.Router();

const homeService = require('../services/homeService');

const logger = require('../config/logger');

router.get('/', getHomePage);
async function getHomePage(req, res, next) {
    let searchTrainerName = req.query.trainerName;
    try {
        logger.info('[homeRouter] [getHomePage]  search trainer Name is : ' + searchTrainerName);
        let trainersAndBanners = await homeService.findAllTrainerAndAdvertisingBanner(searchTrainerName);
        res.status(200).send(trainersAndBanners);
    } catch (e) {
        next(e);
    }
}

module.exports = router;