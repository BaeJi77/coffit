const moment = require('moment');

const trainerRepository = require('../repositories/trainerRepository');
const studentRepository = require('../repositories/studentRepository');

/**
 * @to_whom
 * 0: to student from trainer
 * 1: to trainer from student
 *
 * @type
 * 0: request pt reservation
 * 1: request changing pt reservation
 * 2: accept pt reservation
 * 3: reject pt reservation or changing reservation
 * 6: create pt feedback
 */

function changeDateFormatToMakeEasyToRead (previousDate) {
    return moment(previousDate).utc().format('MM-DD HH:mm');
}


function makeContentWhenCreatingPtFeedBack() {
    return "트레이너의 한마디가 등록되었어요."
}

function makeContentWhenRequestingPtReservation(requestNotification, trainerName, studentName) {
    if(requestNotification.to_whom === 0) {
        return trainerName + "트레이너 님이 " + changeDateFormatToMakeEasyToRead(requestNotification.request_date) + "로 PT를 요청했습니다."
    } else {
        return studentName + " 회원님이 " + changeDateFormatToMakeEasyToRead(requestNotification.request_date) + "로 PT를 요청했습니다."
    }
}

function makeContentWhenRequestingChangingPtReservation(requestNotification, trainerName, studentName) {
    if(requestNotification.to_whom === 0) {
        return trainerName + "트레이너 님이 " + changeDateFormatToMakeEasyToRead(requestNotification.origin_date) + "에서 " + changeDateFormatToMakeEasyToRead(requestNotification.request_date) + "으로 PT를 변경 요청했습니다."
    } else {
        return studentName + " 회원님이 " + changeDateFormatToMakeEasyToRead(requestNotification.origin_date)+ "에서 " + changeDateFormatToMakeEasyToRead(requestNotification.request_date) + "으로 PT를 변경 요청했습니다."
    }
}

function makeContentWhenAcceptPtReservation(requestNotification) {
    return changeDateFormatToMakeEasyToRead(requestNotification.request_date) + " 로 예약완료 되었습니다.";
}

function makeContentWhnRejectPtReservation(requestNotification, trainerName, studentName) {
    if(requestNotification.to_whom === 0) {
        return trainerName + " 트레이너님이 일정이 맞지 요청을 거절하였습니다.";
    } else {
        return studentName + " 회원님이 일정이 맞지 요청을 거절하였습니다.";
    }
}


module.exports = async (newNotification) => {
    let trainerInformation = await trainerRepository.findTrainerUsingTrainerId(newNotification.trainer_id);
    let studentInformation = await studentRepository.findStudentUsingStudentId(newNotification.student_id);

    let trainerName = trainerInformation.username;
    let studentName = studentInformation.username;
    let notificationContent;
    switch (newNotification.type) {
        case 0:
            notificationContent = makeContentWhenRequestingPtReservation(newNotification, trainerName, studentName);
            break;

        case 1:
            notificationContent = makeContentWhenRequestingChangingPtReservation(newNotification, trainerName, studentName);
            break;

        case 2:
            notificationContent = makeContentWhenAcceptPtReservation(newNotification);
            break;

        case 3:
            notificationContent = makeContentWhnRejectPtReservation(newNotification, trainerName, studentName);
            break;

        case 6:
            notificationContent = makeContentWhenCreatingPtFeedBack();
            break;


        default:
            break;
    }
    return notificationContent;
};