const reviewRepository = require('../repositories/reviewRepository');
const trainerRepository = require('../repositories/trainerRepository');

module.exports = {
    makeNewReview: async function(newReviewInformation) {
        return reviewRepository.createNewReview(newReviewInformation)
            .then(async (newReview) => {
                trainerRepository.increaseTrainerScoreWhenMakingReview(newReviewInformation.trainer_id, newReviewInformation.star);
                return newReview;
            })
    },

    findAllReviewsOfTrainer: async function(trainerId) {
        return reviewRepository.findAllReviewsByTrainerId(trainerId);
    }
};