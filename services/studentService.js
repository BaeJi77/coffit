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
        try {
            newStudentInformation = setPictureInObject(newStudentInformation, profilePicture);
            return await studentRepository.createStudent(newStudentInformation);
        } catch (e) {
            throw e;
        }
    },

    updateStudentUsingStudentId: async function(studentId, updateStudentInformation, profilePicture) {
        try {
            updateStudentInformation = setPictureInObject(updateStudentInformation, profilePicture);
            return await studentRepository.updateStudent(studentId, updateStudentInformation)
        } catch (e) {
            throw e;
        }
    },

    updateFcmTokenOfStudent: async function(studentId, FcmToken) {
        try {
            return await studentRepository.updateStudentFcmToken(studentId, FcmToken);
        } catch (e) {
            throw e;
        }
    },

    findCertainStudent: async function (studentId) {
        try {
            return await studentRepository.findStudentUsingStudentId(studentId);
        } catch (e) {
            throw e;
        }
    },

    findAllStudentOfTrainerOrSearchedStudents: async function (trainerId, studentName) {
        try {
            let studentIdArray = await ptRepository.findAllStudentIdUsingTrainerId(trainerId);
            if(isUndefined(studentName)) {
                return await studentRepository.findAllStudentUsingStudentIdArray(studentIdArray);
            } else {
                return await studentRepository.findAllStudentOfTrainerSearchingStudentName(studentIdArray, studentName);
            }
        } catch (e) {
            throw e;
        }
    },
};