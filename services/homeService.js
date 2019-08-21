const isUndefined = require('is-undefined');

const bannerRepository = require('../repositories/bannerRepository');
const trainerRepository = require('../repositories/trainerRepository');

const logger = require('../config/logger');

async function decideSearchConditionUsingTrainerName(trainerName) {
    if(isUndefined(trainerName)) {
        return await trainerRepository.findAllTrainers();
    } else {
        return trainerRepository.findTrainerUsingTrainerName(trainerName);
    }
}

module.exports = {
    findAllTrainerAndAdvertisingBanner: async function(trainerName) {
        let allTrainerAndBanner = {};
        try {
            allTrainerAndBanner.trainer_list = await decideSearchConditionUsingTrainerName(trainerName);
            allTrainerAndBanner.banner = await bannerRepository.findAllBanner();
            logger.info('[homeService] [findAllTrainerAndAdvertisingBanner] Success find trainers and banner');
            return allTrainerAndBanner;
        } catch (err) {
            throw err;
        }
    }
};