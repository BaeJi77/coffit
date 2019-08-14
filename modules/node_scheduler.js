const ptRepository = require('../repositories/ptRepository');
const trainerScheduleRepository = require('../repositories/trainerScheduleRepository');

const moment = require('moment');
const schedule = require('node-schedule');


// if end_date pass now date, make close target pt
schedule.scheduleJob('0 0 * * *', async () => {
    console.log('Today is : ' + moment().format('YYYY-MM-DD HH:mm:ss'));
    let ptClosedCount = await ptRepository.closePtsPassedEndDate();
    console.log('Closed count is : ' + ptClosedCount);
});

// delete all trainer schedule that is passed now.
schedule.scheduleJob('0 0 * * *', async () => {
    let nowDateOnlyDayNotTime = moment().subtract(1, 'd').format('YYYY-MM-DD 00:00:00');
    let endDate = moment(nowDateOnlyDayNotTime).add(1, 'd').format('YYYY-MM-DD 00:00:00');
    await trainerScheduleRepository.deleteAllTrainerScheduleIsPassedDate(nowDateOnlyDayNotTime, endDate);
});

// TODO: today trainer or student have pt schedule, make a notifications