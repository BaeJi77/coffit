const {Trainer} = require('../models');

module.exports = {
    findAllTrainers: async function() {
        return await Trainer.findAll();
    }
}