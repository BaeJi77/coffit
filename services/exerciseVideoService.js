const exerciseVideoRepository = require('../repositories/exerciseVideoRepository');
const missionRepository = require('../repositories/missionRepository');

const preSignedUrlGenerator = require('../modules/s3_operator');

const fcmPush = require('../modules/fcm_send_message');

async function updateKeyNameAboutNewExerciseVideo (newExerciseVideoId, videoFormat) {
    let key_name = newExerciseVideoId + "." + videoFormat;
    await exerciseVideoRepository.updateExerciseVideo(newExerciseVideoId, {"key_name": key_name});
}

module.exports = {
    makeNewExerciseVideo: async function (newExerciseVideoInformation) {
        try {
            let newExerciseVideo = await exerciseVideoRepository.createNewExerciseVideo(newExerciseVideoInformation);
            updateKeyNameAboutNewExerciseVideo(newExerciseVideo.id, newExerciseVideoInformation.videoFormat);
            return preSignedUrlGenerator.getPostPreSignedUrl(newExerciseVideo.id, newExerciseVideoInformation.videoFormat);
        } catch (e) {
            throw e;
        }
    },

    addTimeTag: async function (exerciseVideoId, timeTag) {
        try {
            let exerciseVideo = await exerciseVideoRepository.findCertainExerciseVideo(exerciseVideoId);
            fcmPush.decideReceivePushTarget(exerciseVideo.student_id, exerciseVideo.trainer_id, 1, 5, " 고객님이 운동 미션을 등록했습니다.", null);
            await missionRepository.updateIsConvertedToTrue(exerciseVideo.mission_id);
            return await exerciseVideoRepository.updateExerciseVideo(exerciseVideoId, timeTag);
        } catch (e) {
            throw e;
        }
    },

    removeExerciseVideo: async function (exerciseVideoId, missionId) {
        try {
            preSignedUrlGenerator.deleteS3Object("missions/origin/" + exerciseVideoId, ".mp4");
            missionRepository.updateHasVideoAndIsConvertedValueToFalse(missionId);
            return await exerciseVideoRepository.deleteExerciseVideo(exerciseVideoId);
        }  catch (e) {
            throw e;
        }
    }
};