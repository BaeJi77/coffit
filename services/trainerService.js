const trainerRepository = require('../repositories/trainerRepository');


module.exports = {
    findAllTrainersOrderByRecognition: async function() {
        return await trainerRepository.findAllTrainers();
    },

    findCertainTrainer: async function(trainerId) {
        return await trainerRepository.findTrainer(trainerId);
    },

    registerNewTrainer: async function(newTrainerInformation, profilePicture, activityPictures) {
        //TODO: S3 사진 업로드 모듈 만들기
        //TODO: trainer 등록 후에 trainerPicture 추가해서 연결해주기

        return await trainerRepository.createTrainer(newTrainerInformation);
    },

    updateTrainerBySelf: async function(trainerId, updateTrainerInformationInRequest) {
        //TODO: find 후에 사진 있는 경우 업데이트, 없는 경우 Create
        return await trainerRepository.updateTrainer(trainerId, updateTrainerInformationInRequest);
    },

    updateFcmTokenOfTrainer: async function(trainerId, FcmToken) {
        return await trainerRepository.updateFcmToken(trainerId, FcmToken);
    }
};
