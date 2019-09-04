const {Schedule} = require('../models');

const logger = require('../config/logger');

module.exports = {
    findAllSchedulesUsingPtId: async function(ptId) {
        return await Schedule.findAll({
            where: {
                pt_id: ptId
            }
        })
    },

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
        logger.info('[scheduleRepository.js] [createNewSchedule] make new schedule');
        logger.info(newSchedule);
        return await Schedule.create(newSchedule);
    },

    updateScheduleStateWhenAcceptingRequest: async function (scheduleId) {
        logger.info('[scheduleRepository.js] [updateScheduleStateWhenAcceptingRequest] accept request schedule. scheduleId: %d', scheduleId);
        return await Schedule.update({
            state: 1
        }, {
            where: {
                id: scheduleId
            }
        })
    },

    updateScheduleStateWhenRequestAnotherDate: async function (scheduleId) {
        logger.info('[scheduleRepository.js] [updateScheduleStateWhenRequestAnotherDate] request another schedule. scheduleId: %d', scheduleId);
        return await Schedule.update({
            state: 2
        }, {
            where: {
                id: scheduleId
            }
        })
    },

    updateScheduleStateWhenTrainerAttendPt: async function (scheduleId) {
        logger.info('[scheduleRepository.js] [updateScheduleStateWhenTrainerAttendPt] trainer enter the room. scheduleId: %d', scheduleId);
        return await Schedule.update({
            state: 4
        }, {
            where: {
                id: scheduleId
            }
        })
    },

    updateScheduleStateWhenFinishedPt: async function (scheduleId) {
        logger.info('[scheduleRepository.js] [updateScheduleStateWhenFinishedPt] finish the pt. scheduleId: %d', scheduleId);
        return await Schedule.update({
            state: 5
        }, {
            where: {
                id: scheduleId
            }
        })
    },

    deleteScheduleUsingScheduleId: async function (scheduleId) {
        logger.info('[scheduleRepository.js] [deleteScheduleUsingScheduleId] remove schedule. scheduleId: %d', scheduleId);
        return await Schedule.destroy({
            where: {
                id: scheduleId
            }
        })
    },

    updateSchedule: async function(scheduleId, requestUpdateSchedule) {
        logger.info('[scheduleRepository.js] [updateSchedule] update simple schedule. scheduleId: %d', scheduleId);
        return await Schedule.update(requestUpdateSchedule, {
            where: {
                id: scheduleId
            }
        })
    }
};