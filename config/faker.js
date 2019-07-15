const faker = require('faker');
const trainerRepository = require('../repositories/trainerRepository');

// let trainerObject = [];
module.exports = {
    makeFakeTrainerData: async function() {
        for (var i = 0; i < 5; i++) {
            var obj = {};
            obj.username = faker.name.findName();
            // obj.price = faker.finance.account();
            obj.price = 10000;
            obj.carrer = faker.lorem.sentences(3, 3);
            obj.picture_url = faker.image.imageUrl();
            obj.phone_number = faker.phone.phoneNumberFormat();
            await trainerRepository.createTrainer(obj);
        }

    }
};