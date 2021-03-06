const {ExerciseVideo} = require('../models');

const logger = require('../config/logger');

module.exports = {
    findCertainExerciseVideo: async function(exerciseVideoId) {
        return await ExerciseVideo.findOne({
            where: {
                id: exerciseVideoId
            }
        })
    },

    createNewExerciseVideo: async function(newExerciseVideo) {
        logger.info('[exerciseVideoRepository.js] [createNewExerciseVideo] Call createNewExerciseVideo method');
        logger.info(newExerciseVideo);
        return await ExerciseVideo.create(newExerciseVideo);
    },

    updateExerciseVideo: async function(exerciseVideoId, updateExerciseVideo) {
        logger.info('[exerciseVideoRepository.js] [updateExerciseVideo] update exerciseVideo information. exerciseVideoId: %d', exerciseVideoId);
        logger.info(updateExerciseVideo);
        return await ExerciseVideo.update(updateExerciseVideo, {
            where: {
                id: exerciseVideoId
            }
        })
    },

    deleteExerciseVideo: async function(exerciseVideoId) {
        logger.info('[exerciseVideoRepository.js] [deleteExerciseVideo] delete exerciseVideo object. exerciseVideoId: %d', exerciseVideoId);
        return await ExerciseVideo.destroy({
            where: {
                id: exerciseVideoId
            }
        })
    }
};