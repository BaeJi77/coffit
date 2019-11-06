const {Banner} = require('../models');

const redis = require('../config/redis');

module.exports = {
    findAllBanner: async function() {
        return redis.redisClient.get('findAllBanner')
            .then(async (res) => {
                if(!res) {
                    let findBannerResult = await Banner.findAll({
                        raw: true
                    });
                    redis.redisClient.set('findAllBanner', JSON.stringify(findBannerResult), 'EX', redis.expireTimeOn1Hour);
                    return findBannerResult;
                } else {
                    return JSON.parse(res);
                }
            });
    },

    createNewBanner: async function(newBannerInformation) {
        return await Banner.create(newBannerInformation);
    }
};