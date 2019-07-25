const faker = require('faker');
const trainerRepository = require('../repositories/trainerRepository');
const trainerPictureRepository = require('../repositories/trainerPictureRepository');
const studentRepository = require('../repositories/studentRepository');
const ptRepository = require('../repositories/ptRepository');
const bannerRepository = require('../repositories/bannerRepository');
const trainerScheduleRepository = require('../repositories/trainerScheduleRepository');

module.exports = {
    makeFakeData: async function() {
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

        for (var i = 1 ; i <= 5 ; i++ ){
            for(var j = 0 ; j < 3 ; j++) {
                var obj = {};
                obj.picture_url = faker.image.imageUrl();
                obj.trainerId = i;
                await trainerPictureRepository.createTrainerPicture(obj);
            }
        }

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

        for(var i = 1 ; i <= 5 ; i++) {
            var obj = {};
            obj.state = faker.random.number(1);
            // obj.pt_room = faker.random.alphaNumeric(15);
            obj.price = faker.finance.account();
            obj.total_number = 8;
            obj.rest_number = i;
            obj.start_date = faker.date.recent();
            obj.end_date = faker.date.future(1, '2019-07-20');
            obj.studentId = i;
            obj.trainerId = 6-i;
            await ptRepository.createNewPt(obj);
        }

        for(var i = 0 ; i < 5 ; i++) {
            var obj = {};
            obj.picture_url = faker.image.imageUrl();
            obj.thumbnail_url = faker.image.imageUrl();
            await bannerRepository.createNewBanner(obj);
        }

        for(var i = 0 ; i < 20 ; i++) {
            var obj = {};
            obj.start_time = Date.now() + 30000 * i;
            obj.available = i%2 === 0;
            await trainerScheduleRepository.createNewTrainerSchedule(obj);
        }
    }
};