const faker = require('faker');
const trainerRepository = require('../repositories/trainerRepository');
const trainerPictureRepository = require('../repositories/trainerPictureRepository');
const studentRepository = require('../repositories/studentRepository');

module.exports = {
    makeFakeTrainerData: async function() {
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
    }
};