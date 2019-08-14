const notificationRepository = require('../repositories/notificationRepository');
const scheduleRepository =require('../repositories/scheduleRepository');

async function addScheduleToNotifications (notifications) {
    let notificationAddedSchedule = [];
    for (var i = 0 ; i < notifications.length ; i++) {
        let scheduleId = notifications[i].schedule_id;
        await notifications[i].setDataValue('schedule', await scheduleRepository.findScheduleUsingScheduleId(scheduleId));
        await notificationAddedSchedule.push(notifications[i]);
    }
    return notificationAddedSchedule
}

module.exports = {
    findStudentNotification: async function(studentId) {
        try {
            let studentNotifications = await notificationRepository.findAllNotificationOfCertainStudent(studentId);
            return await addScheduleToNotifications(studentNotifications);
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