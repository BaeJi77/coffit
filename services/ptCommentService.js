const ptCommentRepository = require('../repositories/ptCommentRepository');

module.exports = {
    createNewPtComment: async function(newPtComment) {
        try {
            return ptCommentRepository.createNewPtComment(newPtComment);
        } catch (e) {
            throw e;
        }
    }
};