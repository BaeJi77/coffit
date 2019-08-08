const {TrainerSchedule} = require('../models');

module.exports = {
    findAllTrainerScheduleOfTrainer: async function(trainerId) {
        return await TrainerSchedule.findAll({
            where: {
                trainer_id: trainerId
            }
        })
    },

    createNewTrainerSchedule: async function(newTrainerScheduleInformation) {
        return await TrainerSchedule.create(newTrainerScheduleInformation);
    },

    // TODO: schedule logic에서 반드시 어떻게 바꿀지 확인해서 state에 값 넣어주기.
    updateTrainerScheduleAvailableToAvailableStateInParameterValue: async function(trainerScheduleId, availableState) {
        return await TrainerSchedule.update({
            available: availableState
        }, {
            where: {
                id: trainerScheduleId
            }
        })
    }
};