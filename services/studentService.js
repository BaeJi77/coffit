const studentRespository = require('../repositories/studentRepository');

var isUndefined = require('is-undefined');

function setPictureInObject(addPictureObject, pictureObject) {
    if(!isUndefined(pictureObject)) {
        addPictureObject.picture_url = pictureObject.location;
    }
    return addPictureObject;
}

module.exports = {
    makeNewStudent: async function(newStudentInformation, profilePicture) {
        newStudentInformation = setPictureInObject(newStudentInformation, profilePicture);
        return await studentRespository.createStudent(newStudentInformation);
    },

    updateStudentUsingStudentId: async function(studentId, updateStudentInformation, profilePicture) {
        updateStudentInformation = setPictureInObject(updateStudentInformation, profilePicture);
        return await studentRespository.updateStudent(studentId, updateStudentInformation)
    },

    updateFcmTokenOfStudent: async function(studentId, FcmToken) {
        console.log(FcmToken);
        return await studentRespository.updateStudentFcmToken(studentId, FcmToken);
    },

    findCertainStudent: async function (studentId) {
        return await studentRespository.findStudent(studentId);
    },

    // TODO: After make schedule table, Please implement.
    findAllStudentOfTrainerOrSearchedStudents: async function (studentName) {
        // studentName is undefined? -> check condition
        if(isUndefined(studentName)) {
            return await studentRespository.findAllStudentIncludingTrainerId();
        } else {
            return await studentRespository.findAllStudentOfTrainerSearchingStudentName();
        }
    },
};