const {Schedule} = require('../models');

module.exports = {
    findScheduleOfStudent: async function (studentId) {
        return await Schedule.findAll({
            where: {
                student_id: studentId
            }
        })
    },

    findScheduleOfTrainer: async function (trainerId) {
        return await Schedule.findAll({
            where: {
                trainer_id: trainerId
            }
        })
    },

    createNewSchedule: async function (newSchedule) {
        return await Schedule.create(newSchedule);
    },

    updateDecidedScheduleWhenRequestingAnotherDate: async function (scheduleId) {
        return await Schedule.update({
            state: 0
        }, {
            where: {
                id: scheduleId
            }
        })
    },

    updateRequestedScheduleWhenAcceptingSchedule: async function (scheduleId) {
        return await Schedule.update({
            state: 1
        }, {
            where: {
                id: scheduleId
            }
        })
    },

    updateExistingScheduleStatue: async function (scheduleId) {
        return await Schedule.update({
            state: 2
        }, {
            where: {
                id: scheduleId
            }
        })
    },

    deleteSchedule: async function (scheduleId) {
        return await Schedule.destroy({
            where: {
                id: scheduleId
            }
        })
    }

};