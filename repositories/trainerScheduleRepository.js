const {trainerSchedule} = require('../models');

module.exports = {
    createNewTrainerSchedule: async function(newTrainerScheduleInformation) {
        return await trainerSchedule.create(newTrainerScheduleInformation);
    },

    // TODO: schedule logic에서 반드시 어떻게 바꿀지 확인해서 state에 값 넣어주기.
    updateTrainerScheduleAvailable: async function(trainerScheduleId, availableState) {
        return await trainerSchedule.update({
            available: availableState
        }, {
            where: {
                id: trainerScheduleId
            }
        })
    }
};