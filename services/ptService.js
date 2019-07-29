const ptRepository = require('../repositories/ptRepository');


module.exports = {
    findAllPtsOfStudentUsingStudentId: async function(studentId) {
        return await ptRepository.findAllPtsOfStudent(studentId);
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