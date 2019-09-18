const missionRepository = require('../repositories/missionRepository');

const logger = require('../config/logger');

module.exports = {
    findMissionDetail: async function(missionId) {
        return await missionRepository.findMissionUsingMissionId(missionId);
    },

    findAllMissionOfCertainStudent: async function(studentId) {
        return await missionRepository.findAllMissionOfStudent(studentId);
    },

    makeNewMission: async function(newMission) {
        // TODO: add delete logic
        return await missionRepository.createNewMission(newMission);
    },

    updateCommentAndRateInMission: async function(missionId, updateMission) {
        return await missionRepository.updateMissionUsingMissionId(missionId, updateMission);
    }
};