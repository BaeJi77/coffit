const exerciseVideoRepository = require('../repositories/exerciseVideoRepository');

const preSignedUrlGenerator = require('../modules/s3_operator');

async function updateKeyNameAboutNewExerciseVideo (newExerciseVideoId, videoFormat) {
    let key_name = newExerciseVideoId + "." + videoFormat;
    await exerciseVideoRepository.updateExerciseVideo(newExerciseVideoId, {"key_name": key_name});
}

module.exports = {
    makeNewExerciseVideo: async function (newExerciseVideoInformation) {
        let newExerciseVideo = await exerciseVideoRepository.createNewExerciseVideo(newExerciseVideoInformation);
        updateKeyNameAboutNewExerciseVideo(newExerciseVideo.id, newExerciseVideoInformation.videoFormat);
        return preSignedUrlGenerator.getPostPreSignedUrl(newExerciseVideo.id, newExerciseVideoInformation.videoFormat);;
    },

    addTimeTag: async function (exerciseVideoId, timeTag) {
        return await exerciseVideoRepository.updateExerciseVideo(exerciseVideoId, timeTag);
    },

    removeExerciseVideo: async function (exerciseVideoId) {
        preSignedUrlGenerator.deleteS3Object(exerciseVideoId);
        return await exerciseVideoRepository.deleteExerciseVideo(exerciseVideoId);
    }
};