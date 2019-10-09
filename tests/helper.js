global.assert = require('assert');
const faker = require('../config/faker');

before(async () => {
    console.log('Test start');
    if(process.env.NODE_ENV === "production")
        throw new Error("production environment!! check NODE_ENV");
    await faker.truncateData();
    await faker.makeFakeData();
});

after(async () => {
    console.log("Test end");
});