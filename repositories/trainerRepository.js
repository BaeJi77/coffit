const {Trainer} = require('../models');
const {TrainerPicture} = require('../models');
const {Op} = require('../models');

module.exports = {
    //TODO: Order하는 경우 service단에서 정렬? 일단 리뷰 만들면 확인해보자.
    findAllTrainers: async function() {
        return await Trainer.findAll();
    },

    findTrainerUsingTrainerId: async function(trainerId) {
        return await Trainer.findOne({
            where:{
                id: trainerId
            },
            include: [{
                model: TrainerPicture
            }]
        });
    },

    findTrainerUsingTrainerName: async function(trainerName) {
        return await Trainer.findAll({
            where: {
                username: {
                    [Op.like]: "%"+trainerName+"%"
                }
            }
        })
    },

    createTrainer: async function(newTrainer) {
        return await Trainer.create(newTrainer);
    },

    updateTrainer: async function(trainerId, updateTrainer) {
        return await Trainer.update(updateTrainer,{
            where: {
                id: trainerId
            }
        });
    },

    updateTrainerFcmToken: async function(trainerId, FcmToken) {
        return await Trainer.update(FcmToken, {
            where: {
                id: trainerId
            }
        })
    }
};