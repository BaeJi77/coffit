const notificationRepository = require('../repositories/notificationRepository');
const scheduleRepository = require('../repositories/scheduleRepository');

const logger = require('../config/logger');

async function addScheduleToNotifications (notifications) {
    let notificationAddedSchedule = [];
    for (var i = 0 ; i < notifications.length ; i++) {
        let scheduleId = notifications[i].schedule_id;
        notifications[i].schedule = await scheduleRepository.findScheduleUsingScheduleId(scheduleId);
        await notificationAddedSchedule.push(notifications[i]);
    }
    return notificationAddedSchedule
}

module.exports = {
    findStudentNotification: async function(studentId) {
        try {
            let studentNotifications = await notificationRepository.findAllNotificationOfCertainStudent(studentId);
            let notificationAddedSchedule = await addScheduleToNotifications(studentNotifications);
            return notificationAddedSchedule;
        } catch (e) {
            throw e;
        }
    },

    findTrainerNotification: async function(trainerId) {
        try {
            let trainerNotifications = await notificationRepository.findAllNotificationOfCertainTrainer(trainerId);
            return await addScheduleToNotifications(trainerNotifications);
        } catch (e) {
            throw e;
        }
    }
};