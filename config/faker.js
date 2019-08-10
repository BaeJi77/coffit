const faker = require('faker');
const trainerRepository = require('../repositories/trainerRepository');
const trainerPictureRepository = require('../repositories/trainerPictureRepository');
const studentRepository = require('../repositories/studentRepository');
const ptRepository = require('../repositories/ptRepository');
const bannerRepository = require('../repositories/bannerRepository');
const trainerScheduleRepository = require('../repositories/trainerScheduleRepository');
const notificationRepository = require('../repositories/notificationRepository');
const scheduleRepository = require('../repositories/scheduleRepository');
const ptCommentRepository = require('../repositories/ptCommentRepository');
const make_notification_context = require('../modules/make_notification_content');

let trainerNames = ['이지수', '배지훈', '정은석', '오우택', '강대명'];
let trainerSummaries = ['홈트 한계를 극복하긴 위한 모두를 위한', '우리 모두 건강한 몸을 위해', '개발자를 위한 건강 챙기기', '버킷서울가기 부끄럽지 않은 몸', '우리 모두 바디스페이스에서 만나요~!'];
let trainerProfilePirtures = ['https://coffit.s3.ap-northeast-2.amazonaws.com/%E1%84%89%E1%85%AE%E1%84%8C%E1%85%B5+1.jpg', 'https://coffit.s3.ap-northeast-2.amazonaws.com/%E1%84%82%E1%85%A1%E1%86%B7%E1%84%8C%E1%85%A1+%E1%84%90%E1%85%B3%E1%84%85%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%82%E1%85%A51.jpg', 'https://coffit.s3.ap-northeast-2.amazonaws.com/%E1%84%82%E1%85%A1%E1%86%B7%E1%84%8C%E1%85%A1+%E1%84%90%E1%85%B3%E1%84%85%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%82%E1%85%A5+4.jpg', 'https://coffit.s3.ap-northeast-2.amazonaws.com/%E1%84%82%E1%85%A1%E1%86%B7%E1%84%8C%E1%85%A1+%E1%84%90%E1%85%B3%E1%84%85%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%82%E1%85%A5+3.jpg', 'https://coffit.s3.ap-northeast-2.amazonaws.com/%E1%84%82%E1%85%A1%E1%86%B7%E1%84%8C%E1%85%A1+%E1%84%90%E1%85%B3%E1%84%85%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%82%E1%85%A5+2.png']
let studentNames = ['신민욱', '공채원', '강성찬', '류동훈', '김민수'];

module.exports = {
    makeFakeData: async function() {
        //create trainer
        for (var i = 0; i < 5; i++) {
            var obj = {};
            obj.username = trainerNames[i];
            obj.price = 30000;
            obj.summary = trainerSummaries[i];
            obj.career = '저 운동 잘해요. 믿고 오세요!';
            obj.picture_url = trainerProfilePirtures[i];
            obj.phone_number = faker.phone.phoneNumberFormat();
            obj.num_review = faker.random.number(20);
            obj.total_star = obj.num_review * (i+1);
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
            obj.username = studentNames[i];
            obj.email = faker.internet.email();
            obj.age = faker.random.number(40);
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
        var tempArray = [];
        for(var j = 1 ; j <= 5 ; j++) {
            for(var i = 0 ; i < 20 ; i++) {
                var obj = {};
                obj.start_time = Date.now() + 3000000 * i;
                obj.available = true;
                obj.trainer_id = j;
                tempArray.push(obj);

            }
        }
        trainerScheduleRepository.createNewTrainerSchedule(tempArray);

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
            obj.schedule_id = i;
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
                obj.is_trainer = j % 2 === 0;
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
            obj.is_trainer = i % 2 === 0;
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
            obj.is_trainer = i % 2 === 0;
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

        for(var i = 1 ; i <= 5 ; i++) {
            var obj = {};
            obj.comment = faker.lorem.sentence();
            obj.pt_id = i;
            ptCommentRepository.createNewPtComment(obj);
        }
    }
};