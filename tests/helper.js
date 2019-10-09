global.assert = require('assert');
const faker = require('../config/faker');

before(async () => {
    console.log('Test start');
    if(process.env.NODE_ENV === "production")
        throw new Error("production environment!! check NODE_ENV");
    await faker.makeFakeData();
});

after(async () => {
    await faker.truncateData();
    console.log("Test end");
});