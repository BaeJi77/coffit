const missionRepository = require('../repositories/missionRepository');
const exerciseVideoRepository = require('../repositories/exerciseVideoRepository');
const ptRepository = require('../repositories/ptRepository');

const s3_operator = require('../modules/s3_operator');
const fcmPush = require('../modules/fcm_send_message');

function findDeletedDateArray (newMissions) {
    let deleteDateArray = [];
    for (mission of newMissions) {
        deleteDateArray.push(mission.date);
    }
    return deleteDateArray;
}

module.exports = {
    findMissionDetail: async function(missionId) {
        try {
            let missionDetail = await missionRepository.findMissionUsingMissionId(missionId);
            if(missionDetail.exerciseVideo) {
                missionDetail.setDataValue('preSignedUrl', await s3_operator.getAccessPreSignedUrl(missionDetail.exerciseVideo.key_name));
            }
            return missionDetail;
        } catch (e) {
            throw e;
        }
    },

    findAllMissionOfCertainStudent: async function(studentId) {
        try {
            return await missionRepository.findAllMissionOfStudent(studentId);
        } catch (e) {
            throw e;
        }
    },

    makeNewMission: async function(ptId, newMissions) {
        try {
            await missionRepository.deleteAllMissionsIncludedArray(ptId ,findDeletedDateArray(newMissions));
            return await missionRepository.createNewMission(newMissions);
        } catch (e) {
            throw e;
        }
    },

    updateCommentAndRateInMission: async function(missionId, updateMission) {
        try {
            return await missionRepository.updateMissionUsingMissionId(missionId, updateMission)
                .then(async (updateResult) => { // to student, 미션에 관한 평가를 트레이너가 작성
                    let missionInformation = await missionRepository.findMissionUsingMissionId(missionId);
                    fcmPush.decideReceivePushTarget(missionInformation.student_id, missionInformation.trainer_id, 0, 5, " 트레이너님이 미션에 대하여 피드백을 남겼습니다.", null);
                    ptRepository.increaseTotalRateAndRateCntWhenTrainerUpdateRate(missionInformation.pt_id, updateMission.rate);
                    return updateResult;
                });
        } catch (e) {
            throw e;
        }
    },

    updateHasVideoColumnAndCheckPastExerciseVideo: async function(missionId, pastExerciseVideoId) {
        try {
            if(pastExerciseVideoId){
                s3_operator.deleteS3Object("missions/origin/" + pastExerciseVideoId, ".mp4");
                exerciseVideoRepository.deleteExerciseVideo(pastExerciseVideoId);
            }
            return await missionRepository.updateHasVideoColumnToTrue(missionId);
        } catch (e) {
            throw e;
        }
    }
};