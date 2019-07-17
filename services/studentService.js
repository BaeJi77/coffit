const studentRespository = require('../repositories/studentRepository');


module.exports = {
    makeNewStudent: async function(newStudentInformation) {
        return await studentRespository.createStudent(newStudentInformation);
    },

    updateStudentUsingStudentId: async function(studentId, updateStudentInformation) {
        return await studentRespository.updateStudent(studentId, updateStudentInformation)
    },

    updateFcmTokenOfStudent: async function(studentId, FcmToken) {
        return await studentRespository.updateStudentFcmToken(studentId, FcmToken);
    },

    findCertainStudent: async function (studentId) {
        return await studentRespository.findStudent(studentId);
    },

    // TODO: After make schedule table, Please implement.
    findAllStudentOfTrainer: async function () {
        return await studentRespository.findAllStudentIncludingTrainerId();
    },

    // TODO: After make schedule table, Please implement.
    findAllSameSearchNameStudentOfTrainer: async function() {
        return await studentRespository.findAllStudentOfTrainerSearchingStudentName();
    }
};