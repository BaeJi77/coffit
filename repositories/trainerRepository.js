const {Trainer, TrainerPicture, Review, Op, Sequelize} = require('../models');

const redis = require('../config/redis');

const logger = require('../config/logger');

module.exports = {
    //TODO: Decide ordering standard to sorting trainer list. ex) review number, Average etc.
    findAllTrainers: async function() {
        logger.info('[trainerRepository.js] [findAllTrainers] find all trainers');
        return redis.redisClient.get('findAllTrainers')
            .then(async (res) => {
                if(!res) {
                    let findAllTrainerResult = await Trainer.findAll({
                        order: [
                            ['num_review', 'DESC']
                        ],
                        raw: true
                    });
                    redis.redisClient.set('findAllTrainers', JSON.stringify(findAllTrainerResult), 'EX', redis.expireTimeOn1Hour);
                    return findAllTrainerResult;
                } else {
                    return JSON.parse(res);
                }
            });
    },

    findTrainerUsingTrainerId: async function(trainerId) {
        logger.info('[trainerRepository.js] [findTrainerUsingTrainerId] find trainer information using trainerId: %d', trainerId);
        return Trainer.findOne({
            where:{
                id: trainerId
            },
            include: [{
                model: TrainerPicture
            }, {
                model: Review,
                limit: 3
            }]
        });
    },

    findTrainerUsingTrainerName: async function(trainerName) {
        logger.info('[trainerRepository.js] [findTrainerUsingTrainerName] search using trainer name : %s', trainerName);
        let cacheKey = 'findTrainerUsingTrainerName:'+trainerName;
        return redis.redisClient.get(cacheKey)
            .then(async (res) => {
                if(!res) {
                    let searchTrainerUsingUsername = await Trainer.findAll({
                        where: {
                            username: {
                                [Op.like]: "%"+trainerName+"%"
                            }
                        },
                        order: [
                            ['num_review', 'DESC']
                        ],
                        raw: true
                    });
                    redis.redisClient.set(cacheKey, JSON.stringify(searchTrainerUsingUsername), 'EX', redis.expireTimeOn1Hour);
                    return searchTrainerUsingUsername;
                } else {
                    return JSON.parse(res);
                }
            });
    },

    createTrainer: async function(newTrainer) {
        logger.info('[trainerRepository.js] [createTrainer] register new trainer');
        logger.info(newTrainer);
        return Trainer.create(newTrainer);
    },

    updateTrainer: async function(trainerId, updateTrainer) {
        logger.info('[trainerRepository.js] [updateTrainer] update trainer information. trainerId: %d', trainerId);
        logger.info(updateTrainer);
        return await Trainer.update(updateTrainer,{
            where: {
                id: trainerId
            }
        });
    },

    updateTrainerFcmToken: async function(trainerId, FcmToken) {
        logger.info('[trainerRepository.js] [updateTrainerFcmToken] update fcm token. trainerId: %d', trainerId);
        logger.info('Fcmtoken: %s', FcmToken);
        return await Trainer.update(FcmToken, {
            where: {
                id: trainerId
            }
        })
    },

    increaseTrainerScoreWhenMakingReview: async function(trainerId, star) {
        logger.info('[trainerRepository.js] [increaseTrainerScoreWhenMakingReview] update trainer score. trainerId: %d, start: %d', trainerId, star);
        return await Trainer.increment({
            'num_review': 1,
            'total_star': star
        }, {
            where: {
                id: trainerId
            }
        })
    }
};