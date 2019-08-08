const {Student} = require('../models');
const {Pt} = require('../models');
const {Op} = require('../models');

module.exports = {
    findAllStudentUsingStudentIdArray: async function(studentIdArray) {
        return await Student.findAll({
            where: {
                id: {
                    [Op.or]: studentIdArray
                }
            }
        });
    },

    findAllStudentOfTrainerSearchingStudentName: async function(studentIdArray, studentName) {
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
        return await Student.findOne({
            where: {
                id: studentId
            }
        })
    },

    createStudent: async function(newStudent) {
        return await Student.create(newStudent);
    },

    updateStudent: async function(studentId, updateStudent){
        return await Student.update(updateStudent, {
            where:{
                id: studentId
            }
        })
    },

    updateStudentFcmToken: async function(studentId, FcmToken) {
        return await Student.update(FcmToken, {
            where: {
                id: studentId
            }
        })
    }
};