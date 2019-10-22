const ptCommentRepository = require('../repositories/ptCommentRepository');
const ptRepository = require('../repositories/ptRepository');

const fcmPush = require('../modules/fcm_send_message');

module.exports = {
    createNewPtComment: async function(newPtComment) {
        try {
            return await ptCommentRepository.createNewPtComment(newPtComment)
                .then(async (ptCommentResult) => {
                    let ptInformation = await ptRepository.findPtUsingPtId(newPtComment.pt_id);
                    fcmPush.decideReceivePushTarget(ptInformation.student_id, ptInformation.trainer_id, 0, 6, "트레이너의 한마디가 등록되었어요.");
                    return ptCommentResult;
                })
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