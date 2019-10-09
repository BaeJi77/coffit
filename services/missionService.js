const missionRepository = require('../repositories/missionRepository');
const exerciseVideoRepository = require('../repositories/exerciseVideoRepository');

const s3_operator = require('../modules/s3_operator');

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
                missionDetail.setDataValue('preSignedUrl', await s3_operator.getAccessPreSignedUrl(missionDetail.exerciseVideo.id));
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
            return await missionRepository.updateMissionUsingMissionId(missionId, updateMission);
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