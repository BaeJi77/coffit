const {Banner} = require('../models');

module.exports = {
    findAllBanner: async function() {
        return await Banner.findAll();
    },

    createNewBanner: async function(newBannerInformation) {
        return await Banner.create(newBannerInformation);
    }
};