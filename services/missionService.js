const missionRepository = require('../repositories/missionRepository');

const s3_operator = require('../modules/s3_operator');

module.exports = {
    findMissionDetail: async function(missionId) {
        try {
            let missionDetail = await missionRepository.findMissionUsingMissionId(missionId);
            missionDetail.setDataValue('preSignedUrl', await s3_operator.getAccessPreSignedUrl(missionDetail.exerciseVideo.id));
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

    makeNewMission: async function(newMission) {
        // TODO: add logic that delete previous mission
        try {
            return await missionRepository.createNewMission(newMission);
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
    }
};