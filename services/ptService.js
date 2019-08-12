const ptRepository = require('../repositories/ptRepository');
const ptCommentRepository = require('../repositories/ptCommentRepository');
const scheduleRepository = require('../repositories/scheduleRepository');


module.exports = {
    findOnePtsOfStudentUsingStudentId: async function(studentId) {
        let ptOfStudentAndPtComment = {};
        try {
            ptOfStudentAndPtComment.pt = await ptRepository.findOnePtsOfStudent(studentId);
            ptOfStudentAndPtComment.schedules = await scheduleRepository.findAllSchedulesUsingPtId(ptOfStudentAndPtComment.pt.id);
            ptOfStudentAndPtComment.ptComment = await ptCommentRepository.findMostRecentlyPtComment(ptOfStudentAndPtComment.pt.id);
        } catch (e) {
            console.error(e);
            throw new Error(e);
        }
        return ptOfStudentAndPtComment;
    },

    findAllPtsOfTrainerUsingTrainerId: async function(trainerId) {
        return await ptRepository.findAllPtsOfTrainer(trainerId);
    },

    makeNewPt: async function(newPtInformation) {
        newPtInformation.price = newPtInformation.price * newPtInformation.total_number;
        return await ptRepository.createNewPt(newPtInformation);
    },

    // TODO: Job schedule 통해서 12시 마다 체크.
    updatePtWhenEndDateIsPassed: async function(ptId) {
        // 만약 end_date가 있는 스케줄이 존재하는 경우?? 어떻게 할꺼니?
        return await ptRepository.closePtsPassedEndDate(ptId);
    },
};