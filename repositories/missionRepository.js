const {Mission, ExerciseVideo, Op} = require('../models');

const logger = require('../config/logger');

module.exports = {
    createNewMission: async function(newMission) {
        logger.info('[missionRepository.js] [createNewMission] Call createNewMission method');
        logger.info(newMission);
        return await Mission.bulkCreate(newMission);
    },

    deleteAllMissionsIncludedArray: async function(ptId, dateArray) {
        logger.info('[missionRepository.js] [deleteAllMissionsIncludedArray] Call destroy all missions when trainer make new mission');
        logger.info('ptId: %d, dateArray: %s', ptId, dateArray.toString());
        return await Mission.destroy({
            where: {
                pt_id: ptId,
                date: {
                    [Op.or]: dateArray
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
            }],
            order: [
                [ExerciseVideo, 'created_at', 'desc']
            ]
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
    },

    updateHasVideoColumnToTrue: async function (missionId) {
        logger.info('[missionRepository.js] [updateHasVideoColumnToTrue] update has_video column to true. missionId: %d', missionId);
        return await Mission.update({
            has_video: true
        }, {
            where: {
                id: missionId
            }
        })
    },

    updateIsConvertedToTrue: async function (missionId) {
        logger.info('[missionRepository.js] [updateIsConvertedToTrue] update is_converted column to true. missionId: %d', missionId);
        return await Mission.update({
            is_converted: true
        }, {
            where: {
                id: missionId
            }
        })
    },

    updateHasVideoAndIsConvertedValueToFalse: async function (missionId) {
        logger.info('[missionRepository.js] [updateHasVideoAndIsConvertedValueToFalse] update is_converted, has_video column to false. missionId: %d', missionId);
        return await Mission.update({
            is_converted: false,
            has_video: false
        }, {
            where: {
                id: missionId
            }
        })
    }
};