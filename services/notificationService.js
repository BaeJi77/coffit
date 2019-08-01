const notificationRepository = require('../repositories/notificationRepository');

module.exports = {
    findStudentNotification: async function(studentId) {
        return await notificationRepository.findAllNotificationOfCertainStudent(studentId);
    },

    findTrainerNotification: async function(trainerId) {
        return await notificationRepository.findAllNotificationOfCertainTrainer(trainerId);
    }
};