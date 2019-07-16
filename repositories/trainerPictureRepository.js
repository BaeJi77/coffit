const {TrainerPicture} = require('../models');

module.exports = {
    findAllTrainerPictureOfCertainTrainerId: async function(trainerId) {
        return await TrainerPicture.findAll({
            where: {
                trainerId: trainerId
            }
        })
    },

    createTrainerPicture: async function(trainerIdAndTrainerPicture) {
        return await TrainerPicture.create(trainerIdAndTrainerPicture);
    },

    updateTrainerPicture: async function(trainerPictureId, trainerPicture) {
        return await TrainerPicture.update(trainerPicture, {
            where: {
                id: trainerPictureId
            }
        })
    }
};