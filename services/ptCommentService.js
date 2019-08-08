const ptCommentRepository = require('../repositories/ptCommentRepository');

module.exports = {
    createNewPtComment: async function(newPtComment) {
        return ptCommentRepository.createNewPtComment(newPtComment);
    }
};