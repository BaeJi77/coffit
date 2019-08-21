const trainerScheduleRepository = require('../repositories/trainerScheduleRepository');

const moment = require('moment');

async function makeDateTimeTypeToOnlyDate (dateTimeType) {
    return moment(dateTimeType).format('YYYY-MM-DD 00:00:00');
}

async function changeTrainerScheduleStratTime (trainerSchedules) {
    let trainerScheduleUpdatedStartTime = [];
    for (const trainerSchedule of trainerSchedules) {
        trainerSchedule.start_time = moment(trainerSchedule.start_time).subtract(9, 'h');
        trainerScheduleUpdatedStartTime.push(trainerSchedule);
    }
    return trainerScheduleUpdatedStartTime;
}

module.exports = {
    makeNewTrainerAvailableDate: async function(newTrainerSchedules) {
        console.log(newTrainerSchedules);
        let startDate = await makeDateTimeTypeToOnlyDate(newTrainerSchedules[0].start_time);
        let endDate = moment(startDate).add(1, 'd').format('YYYY-MM-DD 00:00:00');
        let trainerScheduleChangedStartTime = await changeTrainerScheduleStratTime(newTrainerSchedules);
        console.log(trainerScheduleChangedStartTime);
        try {
            await trainerScheduleRepository.deleteAllTrainerScheduleCertainDateAvailableIsTrue(newTrainerSchedules[0].trainer_id, startDate, endDate);
            return await trainerScheduleRepository.createNewTrainerSchedule(trainerScheduleChangedStartTime);
        } catch (e) {
            throw e;
        }
    }
};