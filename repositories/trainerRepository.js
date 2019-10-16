const {Trainer, TrainerPicture, Review, Op} = require('../models');

const logger = require('../config/logger');

module.exports = {
    //TODO: Decide ordering standard to sorting trainer list. ex) review number, Average etc.
    findAllTrainers: async function() {
        logger.info('[trainerRepository.js] [findAllTrainers] find all trainers');
        return await Trainer.findAll({
            raw: true
        });
    },

    findTrainerUsingTrainerId: async function(trainerId) {
        logger.info('[trainerRepository.js] [findTrainerUsingTrainerId] find trainer information using trainerId: %d', trainerId);
        return await Trainer.findOne({
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
        return await Trainer.findAll({
            where: {
                username: {
                    [Op.like]: "%"+trainerName+"%"
                }
            },
        }, {
            raw: true
        })
    },

    createTrainer: async function(newTrainer) {
        logger.info('[trainerRepository.js] [createTrainer] register new trainer');
        logger.info(newTrainer);
        return await Trainer.create(newTrainer);
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
    }
};