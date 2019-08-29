const {Pt} = require('../models');
const {Schedule} = require('../models');
const {Student} = require('../models');

const {Op} = require('../models');

const logger = require('../config/logger');

module.exports = {
    findAllStudentIdUsingTrainerId: async function(trainerId) {
        return await Pt.findAll({
            where: {
                trainer_id: trainerId
            }
        }).then(pts => {
            let studentIdArray = [];
            pts.forEach(item => {
                studentIdArray.push(item.student_id);
            });
            return studentIdArray;
        })
    },

    findOnePtsOfStudent: async function(studentId) {
        return await Pt.findOne({
            where: {
                studentId: studentId
            }
        });
    },

    findAllPtsOfTrainer: async function(trainerId) {
        return await Pt.findAll({
            where: {
                trainerId: trainerId
            },
            include: [{
                model: Schedule
            }, {
                model: Student
            }]
        });
    },

    createNewPt: async function(newPtInformation) {
        logger.info('[ptRepository] [createNewPt] create new pt.');
        logger.info(newPtInformation);
        return await Pt.create(newPtInformation);
    },

    closePtsPassedEndDate: async function() {
        return await Pt.update({
            state: 1
        }, {
            where: {
                state: 0,
                end_date: {
                    [Op.lte]: Date.now()
                }
            }
        })
    },

    decreaseRestPtNumberAfterPt: async function(ptId) {
        logger.info('[ptRepository] [decreaseRestPtNumberAfterPt] When pt is finished, rest pt count is decreased. ptId: %d', ptId);
        return await Pt.decrement('rest_number', {
            where: {
                id: ptId
            }
        });
    }
};
