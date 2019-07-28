const faker = require('faker');
const trainerRepository = require('../repositories/trainerRepository');
const trainerPictureRepository = require('../repositories/trainerPictureRepository');
const studentRepository = require('../repositories/studentRepository');
const ptRepository = require('../repositories/ptRepository');
const bannerRepository = require('../repositories/bannerRepository');
const trainerScheduleRepository = require('../repositories/trainerScheduleRepository');
const notificationService = require('../services/notificationService');

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
                await trainerPictureRepository.createTrainerPicture(obj);
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

        // create pt
        for(var i = 1 ; i <= 5 ; i++) {
            var obj = {};
            obj.state = faker.random.number(1);
            obj.price = faker.finance.account();
            obj.total_number = 8;
            obj.rest_number = i;
            obj.start_date = faker.date.recent();
            obj.end_date = faker.date.future(1);
            obj.studentId = i;
            obj.trainerId = 6-i;
            await ptRepository.createNewPt(obj);
        }

        // create banner
        for(var i = 0 ; i < 5 ; i++) {
            var obj = {};
            obj.picture_url = faker.image.imageUrl();
            obj.thumbnail_url = faker.image.imageUrl();
            await bannerRepository.createNewBanner(obj);
        }

        // create trainer schedule
        for(var i = 0 ; i < 20 ; i++) {
            var obj = {};
            obj.start_time = Date.now() + 30000 * i;
            obj.available = i%2 === 0;
            await trainerScheduleRepository.createNewTrainerSchedule(obj);
        }

        // TODO: add notification faker data.
        for(var i = 1 ; i <= 20 ; i++) {
            var obj = {};
            obj.toWhom = i % 2;
            obj.rejectMessage = faker.lorem.sentence();
            var randomType = obj.type = faker.random.number(4);
            if(randomType === 2)
                obj.originDate = faker.date.recent();
            obj.requestDate = faker.date.future(1);
            obj.trainerId = (i % 5) + 1;
            obj.studentId = ((20 - i) % 5) + 1;
            await notificationService.makeNewNotificationDecidingStudentOrTrainer(obj);
        }
    }
};