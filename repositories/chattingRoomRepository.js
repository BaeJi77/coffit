const {ChattingRoom} = require('../models');

const logger = require('../config/logger');

module.exports = {
    findAllChattingRoomsOfStudent: async (studentId) => {
        return ChattingRoom.findAll({
            where: {
                student_id: studentId
            }
        });
    },

    findAllChattingRoomsOfTrainer: async (trainerId) => {
        return ChattingRoom.findAll({
            where: {
                trainer_id: trainerId
            }
        })
    },

    createNewChattingRoom: async (newChattingRoomInformation) => {
        logger.info('[chattingRoomRepository.js] [createNewChattingRoom] Call createNewChattingRoom method');
        logger.info(newChattingRoomInformation);
        return ChattingRoom.create(newChattingRoomInformation);
    }
};