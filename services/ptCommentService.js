const ptCommentRepository = require('../repositories/ptCommentRepository');


module.exports = {
    createNewPtComment: async function(newPtComment) {
        try {
            return await ptCommentRepository.createNewPtComment(newPtComment);;
        } catch (e) {
            throw e;
        }
    },

    updatePtComment: async function (ptCommentId, updatePtCommentInformation) {
        try {
            return await ptCommentRepository.updatePtCommentUsingptCommentId(ptCommentId, updatePtCommentInformation);
        } catch (e) {
            throw e;
        }
    }
};