var express = require('express');
var router = express.Router();

const homeService = require('../services/homeService');

router.get('/', getHomePage);
async function getHomePage(req, res, next) {
    let searchTrainerName = req.query.trainerName;
    res.status(200).send(await homeService.findAllTrainerAndAdvertisingBanner(searchTrainerName));
}

module.exports = router;