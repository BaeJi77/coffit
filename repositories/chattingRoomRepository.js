const {ChattingRoom, sequelize} = require('../models');

const logger = require('../config/logger');

module.exports = {
    findAllChattingRoomsOfStudent: async (studentId) => {
        return sequelize.query('select distinct *\n' +
            'from chatting_rooms a left join ( \n' +
            'select messageReads.student_id , count(messageReads.read) as unread\n' +
            'from message_reads as messageReads inner join chatting_rooms\n' +
            'on chatting_rooms.id = messageReads.chatting_room_id\n' +
            'where messageReads.student_id is not null\n' +
            'and messageReads.read = false\n' +
            'group by messageReads.student_id\n' +
            ') b on a.student_id = b.student_id \n' +
            'where a.student_id = :studentId;',
            {
                replacements: {
                    studentId: studentId
                },
                type: sequelize.QueryTypes.SELECT
            }
        )
    },

    findAllChattingRoomsOfTrainer: async (trainerId) => {
        return sequelize.query('select distinct *\n' +
            'from chatting_rooms a left join ( \n' +
            'select messageReads.trainer_id , count(messageReads.read) as unread\n' +
            'from message_reads as messageReads inner join chatting_rooms\n' +
            'on chatting_rooms.id = messageReads.chatting_room_id\n' +
            'where messageReads.trainer_id is not null\n' +
            'and messageReads.read = false\n' +
            'group by messageReads.trainer_id\n' +
            ') b on a.trainer_id = b.trainer_id \n' +
            'where a.trainer_id = :trainerId;',
            {
                replacements: {
                    trainerId: trainerId
                },
                type: sequelize.QueryTypes.SELECT
            }
        )
    },

    createNewChattingRoom: async (newChattingRoomInformation) => {
        logger.info('[chattingRoomRepository.js] [createNewChattingRoom] Call createNewChattingRoom method');
        logger.info(newChattingRoomInformation);
        return ChattingRoom.create(newChattingRoomInformation);
    }
};