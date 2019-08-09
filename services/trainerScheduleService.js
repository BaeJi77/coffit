const trainerScheduleRepository = require('../repositories/trainerScheduleRepository');

const moment = require('moment');

async function makeDateTimeTypeToOnlyDate (dateTimeType) {
    return moment(dateTimeType).format('YYYY-MM-DD 00:00:00');
}

module.exports = {
    makeNewTrainerAvailableDate: async function(newTrainerSchedule) {
        let startDate = await makeDateTimeTypeToOnlyDate(newTrainerSchedule[0].start_time);
        let endDate = moment(startDate).add(1, 'd').format('YYYY-MM-DD 00:00:00');
        try {
            await trainerScheduleRepository.deleteAllTrainerScheduleCertainDateAvailableIsTrue(newTrainerSchedule[0].trainer_id, startDate, endDate);
            return await trainerScheduleRepository.createNewTrainerSchedule(newTrainerSchedule);
        } catch (e) {
            console.error(e);
            throw new Error(e);
        }
    }
};