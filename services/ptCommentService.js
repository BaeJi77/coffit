const ptCommentRepository = require('../repositories/ptCommentRepository');

const logger = require('../config/logger');

module.exports = {
    createNewPtComment: async function(newPtComment) {
        try {
            let newPtComment = ptCommentRepository.createNewPtComment(newPtComment);
            logger.info('[ptCommentService.js] [createNewPtComment] Success create new PT comment');
            return newPtComment;
        } catch (e) {
            throw e;
        }
    }
};