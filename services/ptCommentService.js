const ptCommentRepository = require('../repositories/ptCommentRepository');

const logger = require('../config/logger');

module.exports = {
    createNewPtComment: async function(newPtComment) {
        try {
            let newPtComment = ptCommentRepository.createNewPtComment(newPtComment);
            return newPtComment;
        } catch (e) {
            throw e;
        }
    }
};