const {Notification} = require('../models');
const {Schedule} = require('../models');

module.exports = {
    // TODO: FCM 연동하여서 알람 내용과 같이 push 알람 가도록
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