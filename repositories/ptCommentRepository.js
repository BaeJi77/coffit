const {PtComment} = require('../models');

const logger = require('../config/logger');

module.exports = {
    findMostRecentlyPtComment: async function(ptId) {
        return await PtComment.findOne({
            limit: 1,
            where: {
                pt_id: ptId
            },
            order: [
                ['createdAt', 'DESC']
            ]
        })
    },

    createNewPtComment: async function(newPtComment) {
        logger.info('[ptCommentRepository.js] [createNewPtComment] Call createNewPtComment');
        logger.info(newPtComment);
        return await PtComment.create(newPtComment);
    }
};