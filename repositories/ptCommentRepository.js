const {PtComment} = require('../models');

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
        return await PtComment.create(newPtComment);
    }
};