const studentRepository = require('../repositories/studentRepository');
const ptRepository = require('../repositories/ptRepository');

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
        return await studentRepository.createStudent(newStudentInformation);
    },

    updateStudentUsingStudentId: async function(studentId, updateStudentInformation, profilePicture) {
        updateStudentInformation = setPictureInObject(updateStudentInformation, profilePicture);
        return await studentRepository.updateStudent(studentId, updateStudentInformation)
    },

    updateFcmTokenOfStudent: async function(studentId, FcmToken) {
        console.log(FcmToken);
        return await studentRepository.updateStudentFcmToken(studentId, FcmToken);
    },

    findCertainStudent: async function (studentId) {
        return await studentRepository.findStudentUsingStudentId(studentId);
    },

    findAllStudentOfTrainerOrSearchedStudents: async function (trainerId, studentName) {
        let studentIdArray = await ptRepository.findAllStudentIdUsingTrainerId(trainerId);
        if(isUndefined(studentName)) {
            return await studentRepository.findAllStudentUsingStudentIdArray(studentIdArray);
        } else {
            return await studentRepository.findAllStudentOfTrainerSearchingStudentName(studentIdArray, studentName);
        }
    },
};