const chattingRoomRepository = require('../repositories/chattingRoomRepository');
const chattingMessageRepository = require('../repositories/chattingMessageRepository');
const messageReadRepository = require('../repositories/messageReadRepository');

function updateUnreadValueToRead (chattingRoomId, iAm) {
    if (iAm === 'student')
        messageReadRepository.updateAllMessageStudentUnreadValueToReadInRoom(chattingRoomId);
    else if (iAm === 'trainer')
        messageReadRepository.updateAllMessageTrainerUnreadValueToReadInRoom(chattingRoomId);
}

module.exports = {
    getAllChattingMessageAndMakeReadAllMessage: async function(chattingRoomId, iAm) {
        updateUnreadValueToRead(chattingRoomId, iAm);
        return await chattingMessageRepository.findAllChattingMessageOfRooms(chattingRoomId);
    },

    makeNewChattingMessageWithMessageRead: async (newChattingMessage) => {
        return await chattingMessageRepository.createNewChattingMessageWithMessageRead(newChattingMessage)
            .then((newMadeChattingMessage) => {
                chattingRoomRepository.updateLastMessage(newChattingMessage.chatting_room_id, newChattingMessage.message);
                return newMadeChattingMessage;
            });
    }
};