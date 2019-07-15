const {Trainer} = require('../models');

module.exports = {
    findAllTrainers: async function() {
        return await Trainer.findAll();
    },

    createTrainer: async function(newTrainer) {
        return await Trainer.create(newTrainer);
    }
}