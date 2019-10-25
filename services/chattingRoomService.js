const chattingRoomRepository = require('../repositories/chattingRoomRepository');

module.exports = {
    makeNewChattingRoomWhenUserSendFirstMessage: async (newChattingInformation) => {
        return await chattingRoomRepository.createNewChattingRoom(newChattingInformation);
    },

    getChattingRoomListForStudent: async (studentId) => {
        return await chattingRoomRepository.findAllChattingRoomsOfStudent(studentId);
    },

    getChattingRoomListForTrainer: async (trainerId) => {
        return await chattingRoomRepository.findAllChattingRoomsOfTrainer(trainerId);
    }
};