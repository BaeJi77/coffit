const ptRepository = require('../repositories/ptRepository');
const ptCommentRepository = require('../repositories/ptCommentRepository');
const scheduleRepository = require('../repositories/scheduleRepository');

const moment = require('moment');


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
        newPtInformation.end_date =
        newPtInformation.price = newPtInformation.price * newPtInformation.total_number;
        return await ptRepository.createNewPt(newPtInformation);
    }
};