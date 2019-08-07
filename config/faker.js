const faker = require('faker');
const trainerRepository = require('../repositories/trainerRepository');
const trainerPictureRepository = require('../repositories/trainerPictureRepository');
const studentRepository = require('../repositories/studentRepository');
const ptRepository = require('../repositories/ptRepository');
const bannerRepository = require('../repositories/bannerRepository');
const trainerScheduleRepository = require('../repositories/trainerScheduleRepository');
const notificationRepository = require('../repositories/notificationRepository');
const scheduleRepository = require('../repositories/scheduleRepository');
const make_notification_context = require('../modules/make_notification_content');

module.exports = {
    makeFakeData: async function() {
        //create trainer
        for (var i = 0; i < 5; i++) {
            var obj = {};
            obj.username = faker.name.findName();
            obj.price = faker.finance.account();
            obj.carrer = faker.lorem.sentences(3, 3);
            obj.picture_url = faker.image.imageUrl();
            obj.phone_number = faker.phone.phoneNumberFormat();
            obj.total_star = faker.random.number(1000);
            await trainerRepository.createTrainer(obj);
        }

        //create trainer picture
        for (var i = 1 ; i <= 5 ; i++ ){
            for(var j = 0 ; j < 3 ; j++) {
                var obj = {};
                obj.picture_url = faker.image.imageUrl();
                obj.trainerId = i;
                trainerPictureRepository.createTrainerPicture(obj);
            }
        }

        // create student
        for (var i = 0; i < 5; i++) {
            var obj = {};
            obj.username = faker.name.findName();
            obj.email = faker.internet.email();
            obj.age = faker.random.number(100);
            obj.picture_url = faker.image.imageUrl();
            obj.phone_number = faker.phone.phoneNumberFormat();
            obj.gender = i % 2 === 0 ? '남성' : '여성';
            await studentRepository.createStudent(obj);
        }

        // create banner
        for(var i = 0 ; i < 5 ; i++) {
            var obj = {};
            obj.picture_url = faker.image.imageUrl();
            obj.thumbnail_url = faker.image.imageUrl();
            bannerRepository.createNewBanner(obj);
        }

        // create trainer schedule
        for(var j = 1 ; j <= 5 ; j++) {
            for(var i = 0 ; i < 20 ; i++) {
                var obj = {};
                obj.start_time = Date.now() + 3000000 * i;
                obj.available = true;
                obj.trainer_id = j;
                trainerScheduleRepository.createNewTrainerSchedule(obj);
            }
        }

        // create notification data
        for(var i = 1 ; i <= 20 ; i++) {
            var obj = {};
            obj.to_whom = i % 2;
            obj.reject_message = faker.lorem.sentence();
            var randomType = obj.type = faker.random.number(4);
            if(randomType === 1)
                obj.origin_date = faker.date.recent();
            else if (randomType === 4)
                obj.type = 6;
            obj.request_date = faker.date.future(1);
            obj.trainer_id = (i % 5) + 1;
            obj.student_id = ((20 - i) % 5) + 1;
            obj.contents = await make_notification_context(obj);
            await notificationRepository.createNewNotification(obj);
        }

        // create pt
        for(var i = 1 ; i <= 5 ; i++) {
            var obj = {};
            obj.state = faker.random.number(1);
            obj.price = faker.finance.account();
            obj.total_number = 8;
            obj.rest_number = i + 1;
            obj.start_date = faker.date.recent();
            obj.end_date = faker.date.future(1);
            obj.student_id = i;
            obj.trainer_id = 6-i;
            ptRepository.createNewPt(obj);
        }

        // create schedule data
        var cnt = 0;
        for(var i = 1 ; i <= 5 ; i++) {
            for(var j = 0 ; j < i ; j++) {
                var obj = {};
                obj.state = 4;
                obj.date = faker.date.past();
                obj.start_time = "17:00";
                obj.end_time = "17:30";
                obj.memo = faker.lorem.sentence();
                obj.past_schedule_id = -1;
                obj.trainer_id = i;
                obj.student_id = 6 - i;
                obj.pt_id = i;
                var obj2 = {};
                obj2.start_time = obj.date;
                obj2.available = false;
                obj2.trainer_id = i;
                obj2.schedule_id = cnt+1;

                await trainerScheduleRepository.createNewTrainerSchedule(obj2)
                    .then(result => {
                        obj.trainer_schedule_id = result.id;
                        scheduleRepository.createNewSchedule(obj);
                    });
                cnt++;
            }

            var obj = {};
            obj.state = 2;
            obj.date = faker.date.future();
            obj.start_time = "17:00";
            obj.end_time = "17:30";
            obj.memo = faker.lorem.sentence();
            obj.past_schedule_id = -1;
            obj.trainer_id = i;
            obj.student_id = 6 - i;
            obj.pt_id = i;

            var obj2 = {};
            obj2.start_time = obj.date;
            obj2.available = false;
            obj2.trainer_id = i;
            obj2.schedule_id = cnt+1;

            await trainerScheduleRepository.createNewTrainerSchedule(obj2)
                .then(result => {
                    obj.trainer_schedule_id = result.id;
                    scheduleRepository.createNewSchedule(obj);
                });
            cnt++;

            var obj = {};
            obj.state = 0;
            obj.date = faker.date.recent();
            obj.start_time = "17:00";
            obj.end_time = "17:30";
            obj.memo = faker.lorem.sentence();
            obj.past_schedule_id = cnt;
            obj.trainer_id = i;
            obj.student_id = 6 - i;
            obj.pt_id = i;

            var obj2 = {};
            obj2.start_time = obj.date;
            obj2.available = false;
            obj2.trainer_id = i;
            obj2.schedule_id = cnt+1;

            await trainerScheduleRepository.createNewTrainerSchedule(obj2)
                .then(result => {
                    obj.trainer_schedule_id = result.id;
                    scheduleRepository.createNewSchedule(obj);
                });
            cnt++;
        }
    }
};