const bannerRepository = require('../repositories/bannerRepository');
const trainerRepository = require('../repositories/trainerRepository');


module.exports = {
    findAllTrainerAndAdvertisingBanner: async function() {
        let allTrainerAndBanner = {};
        allTrainerAndBanner.trainer_list = await trainerRepository.findAllTrainers();
        allTrainerAndBanner.banner = await bannerRepository.findAllBanner();
        return allTrainerAndBanner;
    }
};