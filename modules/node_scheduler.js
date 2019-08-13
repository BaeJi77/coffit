const ptRepository = require('../repositories/ptRepository');

const moment = require('moment');
const schedule = require('node-schedule');

let howLongTimeIsPassedVerMinute = 0;
schedule.scheduleJob('0 * * * * *', () => {
    console.log('Now : ' + moment().format('YYYY-MM-DD HH:mm:ss'));
    console.log(++howLongTimeIsPassedVerMinute + '분 지났습니다.');
});

// if end_date pass now date, make close target pt
schedule.scheduleJob('0 0 * * *', async () => {
    console.log('Today is : ' + moment().format('YYYY-MM-DD HH:mm:ss'));
    console.log('Closed count is : ' + await ptRepository.closePtsPassedEndDate());
});

// today trainer or student have pt schedule, make a notification
schedule.scheduleJob('0 * * * * *', async () => {

});
