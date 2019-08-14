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
            throw e;
        }
        return ptOfStudentAndPtComment;
    },

    findAllPtsOfTrainerUsingTrainerId: async function(trainerId) {
        try {
            return await ptRepository.findAllPtsOfTrainer(trainerId);
        } catch (e) {
            throw e;
        }
    },

    makeNewPt: async function(newPtInformation) {
        try {
            newPtInformation.end_date = moment(newPtInformation.start_date).add(1, 'M').format();
            newPtInformation.price = newPtInformation.price * newPtInformation.total_number;
            return await ptRepository.createNewPt(newPtInformation);
        } catch (e) {
            throw e;
        }
    }
};