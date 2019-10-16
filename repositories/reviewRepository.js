const {Review} = require('../models');

const logger = require('../config/logger');

module.exports = {
    createNewReview: async function(newReviewInformation) {
        logger.info('[reviewRepository.js] [createNewReview] create new review');
        logger.info(newReviewInformation);
        return Review.create(newReviewInformation);
    },

    findAllReviewsByTrainerId: async function(trainerId) {
        return Review.findAll({
            where: {
                trainer_id: trainerId
            }
        })
    }
};