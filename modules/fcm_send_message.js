const {studentPush, trainerPush} = require('./fcm_connection');
const studentRepository = require('../repositories/studentRepository');
const trainerRepository = require('../repositories/trainerRepository');

const moment = require('moment');
const logger = require('../config/logger');

function convertDateTypeToYYYYMMDD (totalDate) {
    return moment(totalDate).utc().format('YYYY-MM-DD');
}

function decideCaseNumberUsingNotificationType (notificationType) {
    let caseNumber;
    switch (notificationType) {
        // 운동미션 변경 완료 or 운동 미션 피드백 완료 후
        case 5:
            caseNumber = '1';
            break;

        // 운동 코멘트 달렸을 경우 => 홈 화면
        case 6:
            caseNumber = '2';
            break;

        // 캘린더로 넘어가야 되는 경우 type: 0(예약 요청), 1(변경 요청), 3(요청 거절), 2(예약 완료)
        default:
            caseNumber = '3';
            break;
    }
    return caseNumber;
}

function makeMessage(body, caseNumber, date) {
    let message = {};
    message.data = {};
    message.android = {};
    message.android.priority = "high";
    message.data.title = "새로운 메세지가 도착했습니다.";
    message.data.message = body;
    message.data.caseNumber = caseNumber.toString(); // 어디로 가야 될 지 판단 기준
    message.data.date = date; // YYYY-MM-DD 형식으로 보내주기
    return message;
}

function sendMessage(message, target) {
    return new Promise((resolve, reject) => {
        if(!message.token)
            reject("token is null");

        target.messaging().send(message)
            .then((res) => {
                resolve(res);
            })
            .catch(err => {
                logger.error(err);
                reject(err);
            })
    })
}

async function pushToStudent (sendingMessage) {
    logger.info("[fcm_send_message.js] [pushToStudent] send push massage to student");
    logger.info(sendingMessage);
    return await sendMessage(sendingMessage, studentPush);
}

async function pushToTrainer (sendingMessage) {
    logger.info("[fcm_send_message.js] [pushToTrainer] send push massage to trainer");
    logger.info(sendingMessage);
    return await sendMessage(sendingMessage, trainerPush);
}

module.exports = {
    decideReceivePushTarget: async function (newNotificationInformation) {
        console.log(newNotificationInformation);
        let caseNumber = decideCaseNumberUsingNotificationType(newNotificationInformation.type);
        let refinedDate = convertDateTypeToYYYYMMDD(newNotificationInformation.request_date);
        let message = makeMessage(newNotificationInformation.contents, caseNumber, refinedDate);
        if(newNotificationInformation.to_whom === 0) {
            let trainerInformation = await studentRepository.findStudentUsingStudentId(newNotificationInformation.student_id);
            message.token = trainerInformation.fcm_token;
            pushToStudent(message);
        } else {
            let studentInformation = await trainerRepository.findTrainerUsingTrainerId(newNotificationInformation.trainer_id);
            message.token = studentInformation.fcm_token;
            pushToTrainer(message);
        }
    }
};