const {MessageRead, Op}  = require('../models');

const logger = require('../config/logger');

module.exports = {
    updateAllMessageTrainerUnreadValueToReadInRoom: async function(chattingRoomId) {
        logger.info('[messageReadRepository.js] [updateAllMessageTrainerUnreadValueToReadInRoom] update unread to read for trainer');
        logger.info('[messageReadRepository.js] [updateAllMessageTrainerUnreadValueToReadInRoom] chattingRoomId: %d', chattingRoomId);
        return MessageRead.update({
            read: true
        }, {
            where: {
                read: false,
                chatting_room_id: chattingRoomId,
                student_id: {
                    [Op.eq]: null
                }
            }
        })
    },

    updateAllMessageStudentUnreadValueToReadInRoom: async function(chattingRoomId) {
        logger.info('[messageReadRepository.js] [updateAllMessageTrainerUnreadValueToReadInRoom] update unread to read for student');
        logger.info('[messageReadRepository.js] [updateAllMessageTrainerUnreadValueToReadInRoom] chattingRoomId: %d', chattingRoomId);
        return MessageRead.update({
            read: true
        }, {
            where: {
                read: false,
                chatting_room_id: chattingRoomId,
                trainer_id: {
                    [Op.eq]: null
                }
            }
        })
    },
};