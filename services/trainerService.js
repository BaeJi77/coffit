const trainerRepository = require('../repositories/trainerRepository');


module.exports = {
    findAllTrainersOrderByRecognition: async function() {
        return await trainerRepository.findAllTrainers();
    },

    findCertainTrainer: async function(trainerId) {
        return await trainerRepository.findTrainer(trainerId);
    },

    registerNewTrainer: async function(newTrainerInformation) {
        //TODO: S3 사진 업로드 모듈 만들기
        return await trainerRepository.createTrainer(newTrainerInformation);
    },

    updateTrainerBySelf: async function(trainerId, updateTrainerInformationInRequest) {
        return await trainerRepository.updateTrainer(trainerId, updateTrainerInformationInRequest);
    },

    updateFCMTokenOfTrainer: async function(trainerId, FCMTokenValue) {
        return await trainerRepository.updateFCMToken(trainerId, FCMTokenValue);
    }
};
