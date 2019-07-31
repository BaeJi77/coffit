const scheduleRepository = require('../repositories/scheduleRepository');

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
 * => if past_schedule_id !== -1 is number, There are two situation.
 *   => 1. already accepted. => update past_schedule state to 1. (state: 2 -> 1)
 *   => 2. not accepted. => don't update (state: 0)
 * * => make notification
 */

async function decideUpdatingPastSchedule (requestedSchedule) {
    let pastScheduleId = requestedSchedule.past_schedule_id;
    if (pastScheduleId !== -1)
        await operateWhenExistingPastSchedule(requestedSchedule);
}

// TODO: 만약 스케줄을 변경 요청하고 또 변경 요청한 경우는? (이전 요청에 대한 답이 오지 않은 상태에서) 재귀적으러 처리해야될 듯
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


module.exports = {
    findAllSchedulesOfStudent: async function (studentId) {
        return await scheduleRepository.findAllScheduleOfStudentUsingStudentId(studentId)
            .catch(err => {
                console.error(err);
                throw new Error(err);
            });
    },

    findAllSchedulesOfTrainer: async function (trainerId) {
        return await scheduleRepository.findAllScheduleOfTrainerUsingTrainerId(trainerId)
            .catch(err => {
                console.log(err);
                throw new Error(err);
            });
    },

    makeNewSchedule: async function (newSchedule) {
        await decideUpdatingPastSchedule(newSchedule);
        return await scheduleRepository.createNewSchedule(newSchedule)
            .catch(err => {
                console.log(err);
                throw new Error(err);
            });
    },

    // TODO: check when updating memo.
    // TODO: 혹시 mysql hook 으로 처리 할 수 있을까?
    updateScheduleWhenAcceptingOrRejecting: async function (scheduleId, updateSchedule) {
        decideUpdatingPastSchedule(updateSchedule);
        let requestedScheduleState = updateSchedule.state;
        if(requestedScheduleState === 1) {
            return await scheduleRepository.updateScheduleStateWhenAcceptingRequest(scheduleId)
                .catch(err => {
                    console.error(err);
                    throw new Error(err);
                });
        } else if (requestedScheduleState === 3) {
            return await scheduleRepository.deleteScheduleUsingScheduleId(scheduleId)
                .catch(err => {
                    console.error(err);
                    throw new Error(err);
                });
        }
    },

    deleteSchedule: async function (scheduleId) {
        return await scheduleRepository.deleteScheduleUsingScheduleId(scheduleId)
            .catch(err => {
                console.error(err);
                throw new Error(err);
            });
    }
};