const ptCommentRepository = require('../repositories/ptCommentRepository');


module.exports = {
    createNewPtComment: async function(newPtComment) {
        try {
            let createPtResult = await ptCommentRepository.createNewPtComment(newPtComment);
            return createPtResult;
        } catch (e) {
            throw e;
        }
    }
};