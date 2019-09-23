const exerciseVideoRepository = require('../repositories/exerciseVideoRepository');
const missionRepository = require('../repositories/missionRepository');

const preSignedUrlGenerator = require('../modules/s3_operator');

async function updateKeyNameAboutNewExerciseVideo (newExerciseVideoId, videoFormat) {
    let key_name = newExerciseVideoId + "." + videoFormat;
    await exerciseVideoRepository.updateExerciseVideo(newExerciseVideoId, {"key_name": key_name});
}

module.exports = {
    makeNewExerciseVideo: async function (newExerciseVideoInformation) {
        let newExerciseVideo = await exerciseVideoRepository.createNewExerciseVideo(newExerciseVideoInformation);
        updateKeyNameAboutNewExerciseVideo(newExerciseVideo.id, newExerciseVideoInformation.videoFormat);
        missionRepository.updateHasVideoColumnToTrue(newExerciseVideoInformation.mission_id); // TODO: 나중에 안드로이드 콜백 관련된 내용이 나온 이후에 수정
        return preSignedUrlGenerator.getPostPreSignedUrl(newExerciseVideo.id, newExerciseVideoInformation.videoFormat);
    },

    addTimeTag: async function (exerciseVideoId, timeTag) {
        return await exerciseVideoRepository.updateExerciseVideo(exerciseVideoId, timeTag);
    },

    removeExerciseVideo: async function (exerciseVideoId, missionId) {
        preSignedUrlGenerator.deleteS3Object(exerciseVideoId);
        missionRepository.updateHasVideoAndIsConvertedValueToFalse(missionId);
        return await exerciseVideoRepository.deleteExerciseVideo(exerciseVideoId);
    }
};