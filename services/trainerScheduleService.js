const trainerScheduleRepository = require('../repositories/trainerScheduleRepository');

module.exports = {
    // TODO: 넘어오는 형식에 따른 parsing logic 만들기
    makeNewTrainerAvailableDate: async function(newTrainerSchedule) {
        return await trainerScheduleRepository.createNewTrainerSchedule(newTrainerSchedule);
    }
};