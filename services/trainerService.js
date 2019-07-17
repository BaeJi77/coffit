const trainerRepository = require('../repositories/trainerRepository');
const trainerPictureRepository = require('../repositories/trainerPictureRepository');
const isUndefined = require('is-undefined');

// activity picture은 변경없으면 아무것도 보내주지 말아주세요.
// profile picture은 일단 picture url을 기본으로 보내주고 업데이트를 요청하는 경우에는 사진도 같이 보내주세요,

async function createActivityPictures (trainerId, activityPictures) {
    // TODO: aws s3 이미지 삭제 -> 참조 : https://gist.github.com/jeonghwan-kim/9597478
    await trainerPictureRepository.deleteAllTrainerActivityPictureIncludingTrainerId(trainerId);
    for(var i = 0, arrayLength = activityPictures.length ; i < arrayLength ; i++) {
        activityPictures[i].trainerId = trainerId;
        activityPictures[i].picture_url = activityPictures[i].location;
        trainerPictureRepository.createTrainerPicture(activityPictures[i]);
    }
}

// Check request information Specifically picture_url column and request file in profilePicture object
function updateProfilePicture (requestTrainerInformation, profilePicture) {
    if (isUndefined(profilePicture)) {
        return requestTrainerInformation.picture_url;
    } else {
        return profilePicture[0].location;
    }
}

async function checkActivityPicturesIsNull (trainerId, activityPictures) {
    if(!isUndefined(activityPictures)){
        await createActivityPictures(trainerId, activityPictures);
    }
}

module.exports = {
    findAllTrainersOrderByRecognition: async function() {
        return await trainerRepository.findAllTrainers();
    },

    findCertainTrainer: async function(trainerId) {
        return await trainerRepository.findTrainer(trainerId);
    },

    // TODO: Refactoring registerNewTrainer, updateTrainerProfile. Because having Same format.
    registerNewTrainer: async function(newTrainerInformation, trainerPictures) {
        let profilePicture = trainerPictures['profilePicture']; // 하나는 반드시 보내도록 들어옴 => 사진 안넣으면 에러임;
        let activityPictures = trainerPictures['activityPictures'];
        newTrainerInformation.picture_url = updateProfilePicture(newTrainerInformation, profilePicture);
        let createTrainerResult = await trainerRepository.createTrainer(newTrainerInformation);
        await checkActivityPicturesIsNull(createTrainerResult.id, activityPictures);
        return createTrainerResult;
    },

    updateTrainerProfile: async function(trainerId, updateTrainerInformationInRequest, trainerPictures) {
        let profilePicture = trainerPictures['profilePicture']; // 하나는 반드시 보내도록 들어옴 => 사진 안넣으면 에러임;
        let activityPictures = trainerPictures['activityPictures'];
        updateTrainerInformationInRequest.picture_url = updateProfilePicture(updateTrainerInformationInRequest, profilePicture);
        await checkActivityPicturesIsNull(trainerId, activityPictures);
        return await trainerRepository.updateTrainer(trainerId, updateTrainerInformationInRequest);;
    },

    updateFcmTokenOfTrainer: async function(trainerId, FcmToken) {
        return await trainerRepository.updateTrainerFcmToken(trainerId, FcmToken);
    }
};
