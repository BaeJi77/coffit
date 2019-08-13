var express = require('express');
var router = express.Router();

const homeService = require('../services/homeService');

router.get('/', getHomePage);
async function getHomePage(req, res, next) {
    let searchTrainerName = req.query.trainerName;
    await homeService.findAllTrainerAndAdvertisingBanner(searchTrainerName)
        .then(trainerAndBanners => {

            res.status(200).send(trainerAndBanners);
        })
        .catch(err => {
            next(err);
        })
}

module.exports = router;