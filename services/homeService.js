const isUndefined = require('is-undefined');

const bannerRepository = require('../repositories/bannerRepository');
const trainerRepository = require('../repositories/trainerRepository');

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
        allTrainerAndBanner.trainer_list = await decideSearchConditionUsingTrainerName(trainerName);
        allTrainerAndBanner.banner = await bannerRepository.findAllBanner();
        return allTrainerAndBanner;
    }
};