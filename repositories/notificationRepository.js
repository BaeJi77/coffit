const {Notification} = require('../models');

module.exports = {
    //make notification. -> fcm까지 신경
    createNewNotification: async function(newNotification) {
        return await Notification.create(newNotification);
    },

    findAllNotificationOfCertainStudent: async function(studentId) {
        return await Notification.findAll({
            where: {
                student_id: studentId,
                to_whom: 0
            }
        })
    },

    findAllNotificationOfCertainTrainer: async function(trainerId) {
        return await Notification.findAll({
            where: {
                trainer_id: trainerId,
                to_whom: 1
            }
        })
    }
};