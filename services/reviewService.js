const reviewRepository = require('../repositories/reviewRepository');

module.exports = {
    makeNewReview: async function(newReviewInformation) {
        return reviewRepository.createNewReview(newReviewInformation);
    },

    findAllReviewsOfTrainer: async function(trainerId) {
        return reviewRepository.findAllReviewsByTrainerId(trainerId);
    }
};