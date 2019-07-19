const {Banner} = require('../models');

module.exports = {
    findAllBanner: async function() {
        return await Banner.findAll();
    }
};