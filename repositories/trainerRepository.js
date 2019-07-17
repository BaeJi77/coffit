const {Trainer} = require('../models');

module.exports = {
    //TODO: Order하는 경우 service단에서 정렬? 일단 리뷰 만들면 확인해보자.
    findAllTrainers: async function() {
        return await Trainer.findAll();
    },

    findTrainer: async function(trainerId) {
        return await Trainer.findOne({
            where:{
                id: trainerId
            }
        });
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
        return await Trainer.update({
            fcm_token: FcmToken
        }, {
            where: {
                id: trainerId
            }
        })
    }
};