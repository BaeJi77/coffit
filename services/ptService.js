const ptRepository = require('../repositories/ptRepository');
const ptCommentRepository = require('../repositories/ptCommentRepository');


module.exports = {
    findOnePtsOfStudentUsingStudentId: async function(studentId) {
        let ptOfStudentAndPtComment;
        try {
            ptOfStudentAndPtComment = await ptRepository.findOnePtsOfStudent(studentId);
            await ptOfStudentAndPtComment.setDataValue('ptComment', await ptCommentRepository.findMostRecentlyPtComment(ptOfStudentAndPtComment.id));
        } catch (e) {
            console.error(e);
            throw new Error(e);
        }
        console.log(ptOfStudentAndPtComment.ptComment);
        return ptOfStudentAndPtComment;
    },

    findAllPtsOfTrainerUsingTrainerId: async function(trainerId) {
        return await ptRepository.findAllPtsOfTrainer(trainerId);
    },

    makeNewPt: async function(newPtInformation) {
        return await ptRepository.createNewPt(newPtInformation);
    },

    // TODO: Job schedule 통해서 12시 마다 체크.
    updatePtWhenEndDateIsPassed: async function(ptId) {
        // 만약 end_date가 있는 스케줄이 존재하는 경우?? 어떻게 할꺼니?
        return await ptRepository.closePtsPassedEndDate(ptId);
    },
};