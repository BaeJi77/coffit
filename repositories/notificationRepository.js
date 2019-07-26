const {Notification} = require('../models/notification');

module.exports = {
    //make notification. -> fcm까지 신경
    createNewNotification: async function(newNotification) {
        return await Notification.create(newNotification);
    },

    findAllNotificationOfCertainStudent: async function(studentId) {
        return await Notification.findAll({
            where: {
                studentId: studentId,
                toWhom: 0
            }
        })
    },

    findAllNotificationOfCertainTrainer: async function(trainerId) {
        return await Notification.findAll({
            where: {
                trainerId: trainerId,
                toWhom: 1
            }
        })
    }
};