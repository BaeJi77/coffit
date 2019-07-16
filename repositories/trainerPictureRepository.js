const {TrainerPicture} = require('../models');

module.exports = {
    createTrainerPicture: async function(trainerIdAndTrainerPicture) {
        return await TrainerPicture.create(trainerIdAndTrainerPicture);
    },

    deleteAllTrainerActivityPictureIncludingTrainerId: async function(trainerId) {
        return await TrainerPicture.destroy({
            where: {
                trainerId: trainerId
            }
        })
    }
};