const {sequelize, ChattingMessage, MessageRead} = require('../models');

const logger = require('../config/logger');

function makeMessageReadObjectOfTrainer (newChattingMessage, readFlag) {
    let messageReadOfTrainer = {};
    messageReadOfTrainer.read = readFlag;
    messageReadOfTrainer.trainer_id = newChattingMessage.trainer_id;
    messageReadOfTrainer.student_id = null;
    messageReadOfTrainer.chatting_message_id = newChattingMessage.id;
    messageReadOfTrainer.chatting_room_id = newChattingMessage.chatting_room_id;
    return messageReadOfTrainer;
}

function makeMessageReadObjectOfStudent (newChattingMessage, readFlag) {
    let messageReadOfStudent = {};
    messageReadOfStudent.read = readFlag;
    messageReadOfStudent.trainer_id = null;
    messageReadOfStudent.student_id = newChattingMessage.student_id;
    messageReadOfStudent.chatting_message_id = newChattingMessage.id;
    messageReadOfStudent.chatting_room_id = newChattingMessage.chatting_room_id;
    return messageReadOfStudent;
}

function makeNewMessageReadArray (connectionLength, newChattingMessage) {
    let messageReadArray = [];
    if(connectionLength === 2) {
        messageReadArray.push(makeMessageReadObjectOfStudent(newChattingMessage, true));
        messageReadArray.push(makeMessageReadObjectOfTrainer(newChattingMessage, true));
    } else if (newChattingMessage.type === 'student') {
        messageReadArray.push(makeMessageReadObjectOfStudent(newChattingMessage, true));
        messageReadArray.push(makeMessageReadObjectOfTrainer(newChattingMessage, false));
    } else if (newChattingMessage.type === 'trainer') {
        messageReadArray.push(makeMessageReadObjectOfStudent(newChattingMessage, false));
        messageReadArray.push(makeMessageReadObjectOfTrainer(newChattingMessage, true));
    }
    return messageReadArray;
}

module.exports = {
    findAllChattingMessageOfRooms: async (chattingRoomId) => {
        return ChattingMessage.findAll({
            where: {
                chatting_room_id: chattingRoomId
            },
            order: [
                ['created_at', 'ASC']
            ]
        })
    },

    createNewChattingMessageWithMessageRead: async (newChattingMessageInformation) => {
        logger.info('[chattingMessageRepository.js] [createNewChattingMessageWithMessageRead] make chattingMessage with messageRead');
        logger.info(newChattingMessageInformation);
        return sequelize.transaction((t) => {
            return ChattingMessage.create(
                newChattingMessageInformation,
                {transaction: t}
            ).then((chattingMessage) => {
                let messageReadArray = makeNewMessageReadArray(newChattingMessageInformation.connectionLength, chattingMessage);
                return MessageRead.bulkCreate(
                    messageReadArray,
                    {transaction: t}
                );
            })
        }).then((transactionResult) => {
            // commit
            return transactionResult;
        }).catch(err => {
            // rollback
            throw err;
        })
    }
};