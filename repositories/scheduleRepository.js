const {Schedule} = require('../models');

module.exports = {
    findAllScheduleOfStudentUsingStudentId: async function (studentId) {
        return await Schedule.findAll({
            where: {
                student_id: studentId
            },
            order: [
                ['created_at', 'ASC'],
            ]
        })
    },

    findAllScheduleOfTrainerUsingTrainerId: async function (trainerId) {
        return await Schedule.findAll({
            where: {
                trainer_id: trainerId
            }
        })
    },

    findScheduleUsingScheduleId: async function (scheduleId) {
        return await Schedule.findOne({
            where: {
                id: scheduleId
            }
        })
    },

    createNewSchedule: async function (newSchedule) {
        return await Schedule.create(newSchedule);
    },

    updateScheduleStateWhenAcceptingRequest: async function (scheduleId) {
        return await Schedule.update({
            state: 1
        }, {
            where: {
                id: scheduleId
            }
        })
    },

    updateScheduleStateWhenRequestAnotherDate: async function (scheduleId) {
        return await Schedule.update({
            state: 2
        }, {
            where: {
                id: scheduleId
            }
        })
    },

    updateScheduleStateWhenTrainerAttendPt: async function (scheduleId) {
        return await Schedule.update({
            state: 4
        }, {
            where: {
                id: scheduleId
            }
        })
    },

    updateScheduleStateWhenFinishedPt: async function (scheduleId) {
        return await Schedule.update({
            state: 5
        }, {
            where: {
                id: scheduleId
            }
        })
    },

    deleteScheduleUsingScheduleId: async function (scheduleId) {
        return await Schedule.destroy({
            where: {
                id: scheduleId
            }
        })
    },

    updateSchedule: async function(scheduleId, requestUpdateSchedule) {
        return await Schedule.update(requestUpdateSchedule, {
            where: {
                id: scheduleId
            }
        })
    }
};