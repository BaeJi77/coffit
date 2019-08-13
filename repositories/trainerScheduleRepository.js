const {TrainerSchedule} = require('../models');
const {Op} = require('../models');

module.exports = {
    findAllTrainerScheduleOfTrainer: async function(trainerId) {
        return await TrainerSchedule.findAll({
            where: {
                trainer_id: trainerId
            }
        })
    },

    deleteAllTrainerScheduleCertainDateAvailableIsTrue: async function(trainerId, certainStartOnDay, certainEndOnDay) {
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
        return await TrainerSchedule.bulkCreate(newTrainerScheduleInformation);
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