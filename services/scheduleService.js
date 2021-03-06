const scheduleRepository = require('../repositories/scheduleRepository');
const notificationRepository = require('../repositories/notificationRepository');
const trainerScheduleRepository = require('../repositories/trainerScheduleRepository');
const ptRepository = require('../repositories/ptRepository');
const trainerRepository = require('../repositories/trainerRepository');
const makeNotificationContent = require('../modules/make_notification_content');
const fcmPush = require('../modules/fcm_send_message');

/**
 * @post - condition
 * 1. state: 0, past_schedule_id: -1
 * => request new schedule
 * => make new schedule
 * * => make notification
 *
 * 2. state: 0, past_schedule_id: Number
 * => request changing to schedule
 * => if already accepted, update past schedule state to 2
 * => else (not accepted) maintaining now state (0)
 * => and make new schedule
 * * => make notification
 *
 * @put - condition
 * 1. state: 1, past_schedule_id: -1 or number
 * => accept update schedule or request making schedule
 * => delete already existing schedule if past_schedule_id === number
 * => and update state to 1
 * * => make notification
 *
 * when rejecting request
 * 2. state: 3, past_schedule_id: -1 or number
 * => if past_schedule_id === -1, delete request schedule
 * => if past_schedule_id === number, delete request schedule. And there are two situation.
 *   => 1. There is already accepted schedule. => update past_schedule state to 1. (state: 2 -> 1)
 *   => 2. There is not accepted schedule. => don't update (state: 0)
 * * => make notification
 */

async function decideUpdatingPastSchedule (requestedSchedule) {
    let pastScheduleId = requestedSchedule.past_schedule_id;
    if (pastScheduleId !== -1)
        await operateWhenExistingPastSchedule(requestedSchedule);
}

async function operateWhenExistingPastSchedule (requestedSchedule) {
    let scheduleState = requestedSchedule.state;
    let pastScheduleId = requestedSchedule.past_schedule_id;
    let pastSchedule = await scheduleRepository.findScheduleUsingScheduleId(pastScheduleId);
    switch (scheduleState) {
        case 0:
            await checkAlreadyAcceptedSchedule(pastSchedule);
            break;

        case 1: // 수락했기 때문에 past schedule을 지워야함.
            await scheduleRepository.deleteScheduleUsingScheduleId(pastScheduleId);
            break;

        case 3: // 이전 데이터 상황에 따라서 업데이트
            await checkAlreadyAcceptedSchedule(pastSchedule);
            break;

        default:
            break;
    }
}

async function checkAlreadyAcceptedSchedule (pastSchedule) {
    if(pastSchedule.state === 1) {
        await scheduleRepository.updateScheduleStateWhenRequestAnotherDate(pastSchedule.id);
    } else if (pastSchedule.state === 2) {
        await scheduleRepository.updateScheduleStateWhenAcceptingRequest(pastSchedule.id);
    }
}

async function makeOccurNotificationToStudentOrTrainer (iAm, requestedSchedule) {
    let newNotification = await makeNotificationAfterMakingSchedule(iAm, requestedSchedule);
    fcmPush.decideReceivePushTarget(newNotification.student_id, newNotification.trainer_id, newNotification.to_whom, newNotification.type, newNotification.contents, newNotification.request_date);
    notificationRepository.createNewNotification(newNotification);
}

async function makeNotificationAfterMakingSchedule (iAm, requestedSchedule) {
    let newNotification = {};
    let notificationTypeAndOriginDate = await makeADistinctionNotificationType(requestedSchedule);
    newNotification.to_whom = makeADistinctionWhereRequestingBy(iAm);
    newNotification.type = requestedSchedule.state;
    newNotification.schedule_id = requestedSchedule.id;
    newNotification.student_id = requestedSchedule.student_id;
    newNotification.trainer_id = requestedSchedule.trainer_id;
    newNotification.request_date = requestedSchedule.date;
    newNotification.type = notificationTypeAndOriginDate.type;
    newNotification.origin_date = notificationTypeAndOriginDate.origin_date;
    newNotification.contents = await makeNotificationContent(newNotification);
    return newNotification;
}

function makeADistinctionWhereRequestingBy (iAm) {
    let to_whom;
    if (iAm === 'student')
        to_whom = 1;
    else if (iAm === 'trainer')
        to_whom = 0;
    return to_whom;
}

async function makeADistinctionNotificationType (requestedSchedule) {
    let notificationTypeAndOriginDate = {};
    switch (requestedSchedule.state) {
        case 0:
            if(requestedSchedule.past_schedule_id === -1)
                notificationTypeAndOriginDate.type = 0;
            else {
                let pastSchedule = await scheduleRepository.findScheduleUsingScheduleId(requestedSchedule.past_schedule_id);
                notificationTypeAndOriginDate.type = 1;
                notificationTypeAndOriginDate.origin_date = pastSchedule.date;
            }
            break;

        case 1:
            notificationTypeAndOriginDate.type = 2;
            break;

        case 3:
            notificationTypeAndOriginDate.type = 3;
            break;

        // 트레이너가 코멘트를 달았을 경우
        case 6:
            notificationTypeAndOriginDate.type = 6;

        default:
            break;
    }
    return notificationTypeAndOriginDate;
}

async function decideToUpdatingWhatUsingScheduleState (scheduleId, iAm, updateSchedule) {
    let updatingResult = {};
    let requestedScheduleState = updateSchedule.state;
    switch (requestedScheduleState) {
        // 승인 하는 경우
        case 1:
            updatingResult = await scheduleRepository.updateScheduleStateWhenAcceptingRequest(scheduleId)
                .then(result => {
                    makeOccurNotificationToStudentOrTrainer(iAm, updateSchedule);
                    return result;
                });
            if(updateSchedule.past_schedule_id !== -1) {
                let pastSchedule = await scheduleRepository.findScheduleUsingScheduleId(updateSchedule.past_schedule_id);
                updatingResult = await trainerScheduleRepository
                    .updateTrainerScheduleAvailableToAvailableStateInParameterValue(pastSchedule.trainer_schedule_id, true);
            }
            break;

        // 거절하는 경우
        case 3:
            updatingResult = await scheduleRepository.deleteScheduleUsingScheduleId(scheduleId)
                .then(result => {
                    makeOccurNotificationToStudentOrTrainer(iAm, updateSchedule);
                    return result;
                });
            if(updateSchedule.past_schedule_id !== -1) {
                let pastSchedule = await scheduleRepository.findScheduleUsingScheduleId(updateSchedule.past_schedule_id);
                updatingResult = await trainerScheduleRepository
                    .updateTrainerScheduleAvailableToAvailableStateInParameterValue(pastSchedule.trainer_schedule_id, true);
            }
            break;

        case 4:
            updatingResult = await scheduleRepository.updateScheduleStateWhenTrainerAttendPt(scheduleId);
            break;

        case 5:
            ptRepository.decreaseRestPtNumberAfterPt(updateSchedule.pt_id);
            updatingResult = await scheduleRepository.updateScheduleStateWhenFinishedPt(scheduleId);
            break;
    }
    return updatingResult
}



module.exports = {
    findAllSchedulesOfStudent: async function (studentId) {
        try {
            return await scheduleRepository.findAllScheduleOfStudentUsingStudentId(studentId)
        } catch (e) {
            throw e;
        }
    },

    findAllSchedulesOfTrainer: async function (trainerId) {
        let trainerScheduleAndAvailableTime = {};
        try {
            trainerScheduleAndAvailableTime.trainer = await trainerRepository.findTrainerUsingTrainerId(trainerId);
            trainerScheduleAndAvailableTime.schedules = await scheduleRepository.findAllScheduleOfTrainerUsingTrainerId(trainerId);
            trainerScheduleAndAvailableTime.availableTime = await trainerScheduleRepository.findAllTrainerScheduleOfTrainer(trainerId);
        } catch (e) {
            throw e;
        }
        return trainerScheduleAndAvailableTime;
    },

    makeNewSchedule: async function (iAm, newSchedule) {
        try {
            await decideUpdatingPastSchedule(newSchedule);
            return await scheduleRepository.createNewSchedule(newSchedule)
                .then(async newSchedule => {
                    makeOccurNotificationToStudentOrTrainer(iAm, newSchedule);
                    trainerScheduleRepository
                        .updateTrainerScheduleAvailableToAvailableStateInParameterValue(newSchedule.trainer_schedule_id, false);
                    return newSchedule;
                })
        } catch (e) {
            throw e;
        }
    },

    updateScheduleWhenAcceptingOrRejecting: async function (scheduleId, iAm, updateSchedule) {
        try {
            return await decideToUpdatingWhatUsingScheduleState(scheduleId, iAm, updateSchedule)
                .then(async result => {
                    decideUpdatingPastSchedule(updateSchedule);
                    return result;
                })
        } catch (e) {
            throw e;
        }
    },

    deleteSchedule: async function (scheduleId) {
        try {
            let targetSchedule = await scheduleRepository.findScheduleUsingScheduleId(scheduleId);
            let deleteScheduleCount = await scheduleRepository.deleteScheduleUsingScheduleId(scheduleId)
                .then(deleteCount => {
                    trainerScheduleRepository
                        .updateTrainerScheduleAvailableToAvailableStateInParameterValue(targetSchedule.trainer_schedule_id, true);
                return deleteCount;
            });
            return deleteScheduleCount;
        } catch (e) {
            throw e;
        }
    },

    addScheduleMemo: async function(scheduleId, requestUpdateSchedule) {
        try {
            return await scheduleRepository.updateSchedule(scheduleId, requestUpdateSchedule);
        } catch (e) {
            throw e;
        }
    }
};