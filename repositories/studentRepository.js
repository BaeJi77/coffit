const {Student} = require('../models');
const {Op} = require('../models');

module.exports = {
    // PT에서 trainerID와 같은 pt object 중에 student id를 확인하여서 그 애들을 모두 보여주기?
    // 하나하나 찾기 조금 그렇지 않나? 조금 더 빠르게 할 수 있는 방법은?
    // TODO: PT table 완성 후 로직 만들기
    findAllStudentIncludingTrainerId: async function(trainerId) {
        return await Student.findAll();
    },

    // TODO: PT table 완성 후 로직 만들기
    findAllStudentOfTrainerSearchingStudentName: async function() {
        return await Student.findAll();
    },

    findStudent: async function(studentId) {
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