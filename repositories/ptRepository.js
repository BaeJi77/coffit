const {Pt} = require('../models');

module.exports = {
    findAllPtsOfStudent: async function(studentId) {
        return await Pt.findAll({
            where: {
                studentId: studentId
            }
        })
    },

    findAllPtsOfTrainer: async function(trainerId) {
        return await Pt.findAll({
            where: {
                trainerId: trainerId
            }
        })
    },

    createNewPt: async function(newPtInformation) {
        return await Pt.create(newPtInformation);
    },

    closePtsPassedEndDate: async function(ptId) {
        return await Pt.update({
            state: 0
        }, {
            where: {
                id: ptId
            }
        })
    },

    findCertainPt: async function(ptId) {
        return await Pt.findOne({
            where: {
                id: ptId
            }
        })
    },

    decreaseRestPtNumberAfterPt: async function(ptId) {
        return await Pt.decrement('rest_number', {
            where: {
                id: ptId
            }
        });
    }
};


/*
* update에 대한 다양한 상황 모두 체크
* 1. state가 바뀌는 경우
*   - 현재 운동중인 상태 -> training, 보통에는 waiting
*   - rest_number가 다 끝남 -> finished
*   - end_date가 지남 -> closed -> 12시 기준 -> job schedule을 통해서 확인해봅시다.
*   - 서로 스케줄 조정 중 -> scheduling
*   - Pt가 끝났을 때 -> rest_number 떨어트리고, state: waiting으로 바꾸기
* 2. 스케줄이 바꿔서 그것에 해당하는 pt정보가 바뀌어야 할 경우
*   - ????
* */

