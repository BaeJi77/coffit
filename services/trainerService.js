const trainerRepository = require('../repositories/trainerRepository');

module.exports = {
    findAllTrainersOrderByRecognition: async function() {
        return await trainerRepository.findAllTrainers();
    }
}