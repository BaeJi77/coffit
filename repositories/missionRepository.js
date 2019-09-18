const {Mission, ExerciseVideo, Op} = require('../models');

const logger = require('../config/logger');

module.exports = {
    createNewMission: async function(newMission) {
        logger.info('[missionRepository.js] [createNewMission] Call createNewMission method');
        logger.info(newMission);
        return await Mission.bulkCreate(newMission);
    },

    deleteAllMissionBetweenSelectedDate: async function(ptId, startDate, endDate) {
        logger.info('[missionRepository.js] [deleteAllMissionBetweenSelectedDate] Call destroy all mission when trainer make new mission');
        logger.info('ptId: %d, startDate: %s, endDate: %s', ptId, startDate, endDate);
        return await Mission.destroy({
            where: {
                pt_id: ptId,
                start_time: {
                    [Op.gte]: startDate,
                    [Op.lte]: endDate
                }
            }
        })
    },

    findMissionUsingMissionId: async function(missionId) {
        return await Mission.findOne({
            where: {
                id: missionId
            },
            include: [{
                model: ExerciseVideo
            }]
        })
    },

    findAllMissionOfStudent: async function(studentId) {
        return await Mission.findAll({
            where: {
                student_id: studentId
            }
        })
    },

    updateMissionUsingMissionId: async function(missionId, updateMission) {
        logger.info('[missionRepository.js] [updateMissionUsingMissionId] update mission information. missionId: %d', missionId);
        logger.info(updateMission);
        return await Mission.update(updateMission, {
            where: {
                id: missionId
            }
        })
    }
};