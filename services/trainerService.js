const trainerRepository = require('../repositories/trainerRepository');
const trainerPictureRepository = require('../repositories/trainerPictureRepository');

const isUndefined = require('is-undefined');
const logger = require('../config/logger');

// activity picture은 변경없으면 아무것도 보내주지 말아주세요.
// profile picture은 일단 picture url을 기본으로 보내주고 업데이트를 요청하는 경우에는 사진도 같이 보내주세요,

async function createActivityPictures (trainerId, activityPictures) {
    // TODO: aws s3 이미지 삭제 -> 참조 : https://gist.github.com/jeonghwan-kim/9597478
    let newTrainerPictureArray = [];
    await trainerPictureRepository.deleteAllTrainerActivityPictureIncludingTrainerId(trainerId);
    for(var i = 0, arrayLength = activityPictures.length ; i < arrayLength ; i++) {
        var newActivityPicture = {};
        newActivityPicture.trainerId = trainerId;
        newActivityPicture.picture_url = activityPictures[i].location;
        trainerPictureRepository.createTrainerPicture(newActivityPicture);
        newTrainerPictureArray.push(newActivityPicture);
    }
    return newTrainerPictureArray;
}

async function checkActivityPicturesIsNull (trainerId, activityPictures) {
    if(!isUndefined(activityPictures)){
        return await createActivityPictures(trainerId, activityPictures);
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

async function getPictureUrl (requestTrainer, trainerPictures) {
    let profilePicture = trainerPictures['profilePicture']; // 하나는 반드시 보내도록 들어옴 => 사진 안넣으면 에러임;
    let picture_url = updateProfilePicture(requestTrainer, profilePicture);
    return picture_url;
}

async function decideMakingTrainerActivityPictures (trainerId, trainerPictures) {
    let activityPictures = trainerPictures['activityPictures'];
    return await checkActivityPicturesIsNull(trainerId, activityPictures);
}

module.exports = {
    findAllTrainersOrderByRecognition: async function() {
        try {
            return await trainerRepository.findAllTrainers();
        } catch (e) {
            throw e;
        }
    },

    findCertainTrainer: async function(trainerId) {
        try {
            return await trainerRepository.findTrainerUsingTrainerId(trainerId);
        } catch (e) {
            throw e;
        }
    },

    registerNewTrainer: async function(newTrainerInformation, trainerPictures) {
        try {
            logger.info('[trainerService] [registerNewTrainer] make new trainer');
            newTrainerInformation.picture_url = await getPictureUrl(newTrainerInformation, trainerPictures);
            logger.info('trainer profile picture URL : %s', newTrainerInformation.picture_url);
            let newTrainer = await trainerRepository.createTrainer(newTrainerInformation);
            let updatedActivityPictures = await decideMakingTrainerActivityPictures(newTrainer.id, trainerPictures);
            logger.info(updatedActivityPictures);
            return newTrainer;
        } catch (e) {
            throw e;
        }
    },

    updateTrainerProfile: async function(trainerId, updateTrainerInformationInRequest, trainerPictures) {
        try {
            logger.info('[trainerService] [updateTrainerProfile] update trainer profile information');
            updateTrainerInformationInRequest.picture_url = await getPictureUrl(updateTrainerInformationInRequest, trainerPictures);
            logger.info('trainer profile picture URL : %s', newTrainerInformation.picture_url);
            let updatedActivityPictures = await decideMakingTrainerActivityPictures(trainerId, trainerPictures);
            logger.info(updatedActivityPictures);
            return await trainerRepository.updateTrainer(trainerId, updateTrainerInformationInRequest);
        } catch (e) {
            throw e;
        }
    },

    updateFcmTokenOfTrainer: async function(trainerId, FcmToken) {
        try {
            return await trainerRepository.updateTrainerFcmToken(trainerId, FcmToken);
        } catch (e) {
            throw e;
        }
    }
};
