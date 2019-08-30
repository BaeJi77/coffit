const {Student} = require('../models');
const {Pt} = require('../models');
const {Op} = require('../models');

module.exports = {
    findAllStudentUsingStudentIdArray: async function(studentIdArray) {
        logger.info('[studentRepository] [findAllStudentUsingStudentIdArray] find certain student. studentIds: %s', studentIdArray.toString());
        return await Student.findAll({
            where: {
                id: {
                    [Op.or]: studentIdArray
                }
            }
        });
    },

    findAllStudentOfTrainerSearchingStudentName: async function(studentIdArray, studentName) {
        logger.info('[studentRepository] [findAllStudentOfTrainerSearchingStudentName] find certain student. studentIds: %s', studentIdArray.toString());
        logger.info('searchName: %s', studentName);
        return await Student.findAll({
            where: {
                id: {
                    [Op.or]: studentIdArray
                },
                username: {
                    [Op.like]: "%"+studentName+"%"
                }
            }
        });
    },

    findStudentUsingStudentId: async function(studentId) {
        logger.info('[studentRepository] [findStudentUsingStudentId] find certain student. studentId: %d', studentId);
        return await Student.findOne({
            where: {
                id: studentId
            }
        })
    },

    createStudent: async function(newStudent) {
        logger.info('[studentRepository] [createStudent] register new student');
        logger.info(newStudent);
        return await Student.create(newStudent);
    },

    updateStudent: async function(studentId, updateStudent){
        logger.info('[studentRepository] [updateStudent] update student information. studentId: %d', studentId);
        logger.info(updateStudent);
        return await Student.update(updateStudent, {
            where:{
                id: studentId
            }
        })
    },

    updateStudentFcmToken: async function(studentId, FcmToken) {
        logger.info('[studentRepository] [updateStudentFcmToken] update fcm token. studentId: %d', studentId);
        logger.info('Fcmtoken: %s', FcmToken);
        return await Student.update(FcmToken, {
            where: {
                id: studentId
            }
        })
    }
};