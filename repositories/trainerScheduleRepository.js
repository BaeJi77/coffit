const {TrainerSchedule} = require('../models');
const {Op} = require('../models');

const logger = require('../config/logger');

module.exports = {
    findAllTrainerScheduleOfTrainer: async function(trainerId) {
        return await TrainerSchedule.findAll({
            where: {
                trainer_id: trainerId
            }
        })
    },

    deleteAllTrainerScheduleIsPassedDate: async function (firstTime, lastTime) {
        return await TrainerSchedule.destroy({
            where: {
                start_time: {
                    [Op.gte]: firstTime,
                    [Op.lte]: lastTime
                },
            }
        })
    },

    deleteAllTrainerScheduleCertainDateAvailableIsTrue: async function(trainerId, certainStartOnDay, certainEndOnDay) {
        logger.info('[trainerScheduleRepository.js] [deleteAllTrainerScheduleCertainDateAvailableIsTrue] Call destroy all previous trainer schedule was requested in the past');
        logger.info('trainerId: %d, startOnDay: %s, endOnDay: %s', trainerId, certainStartOnDay, certainEndOnDay);
        return await TrainerSchedule.destroy({
            where: {
                trainer_id: trainerId,
                start_time: {
                    [Op.gte]: certainStartOnDay,
                    [Op.lte]: certainEndOnDay
                },
                available: true
            }
        })
    },

    createNewTrainerSchedule: async function(newTrainerScheduleInformation) {
        logger.info('[trainerScheduleRepository.js] [createNewTrainerSchedule] Call new trainer schedule');
        logger.info(newTrainerScheduleInformation);
        return await TrainerSchedule.bulkCreate(newTrainerScheduleInformation);
    },

    updateTrainerScheduleAvailableToAvailableStateInParameterValue: async function(trainerScheduleId, availableState) {
        logger.info('[trainerScheduleRepository.js] [updateTrainerScheduleAvailableToAvailableStateInParameterValue] update available state');
        logger.info('trainerId : %d, updateStateValue: %s', trainerScheduleId, availableState);
        return await TrainerSchedule.update({
            available: availableState
        }, {
            where: {
                id: trainerScheduleId
            }
        })
    }
};