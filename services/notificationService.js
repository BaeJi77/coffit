const notificationRepository = require('../repositories/notificationRepository');
const trainerRepository = require('../repositories/trainerRepository');
const studentRepository = require('../repositories/studentRepository');

/**
 * @toWhom
 * 0: to student from trainer
 * 1: to trainer from student
 *
 * @type
 * 0: create pt feedback
 * 1: request pt reservation
 * 2: request changing pt reservation
 * 3: accept pt reservation
 * 4: reject pt reservation or changing reservation
 */


async function decideWhatMakeContentUsingType(newNotification) {
    //TODO: 반환 Date 형식 이쁘게 바꾸기.
    let trainerName;
    let studentName;
    await trainerRepository.findTrainerUsingTrainerId(newNotification.trainer_id).then(result => {
        trainerName = result.username;
    });
    await studentRepository.findStudentUsingStudentId(newNotification.student_id).then(result => {
        studentName = result.username;
    });
    let notificationContent;
    switch (newNotification.type) {
        case 0:
            notificationContent = makeContentWhenCreatingPtFeedBack();
            break;

        case 1:
            notificationContent = makeContentWhenRequestingPtReservation(newNotification, trainerName, studentName);
            break;

        case 2:
            notificationContent = makeContentWhenRequestingChangingPtReservation(newNotification, trainerName, studentName);
            break;

        case 3:
            notificationContent = makeContentWhenAcceptPtReservation(newNotification);
            break;

        case 4:
            notificationContent = makeContentWhnRejectPtReservation(newNotification, trainerName, studentName);
            break;

        default:
            break;
    }
    return notificationContent;
}

function makeContentWhenCreatingPtFeedBack() {
    return "트레이너의 한마디가 등록되었어요. 지금 확인해보실래요?"
}

function makeContentWhenRequestingPtReservation(requestNotification, trainerName, studentName) {
     if(requestNotification.toWhom === 0) {
         return trainerName + "트레이너 님이 " + requestNotification.requestDate + "로 PT를 요청했습니다. 가능할까요?"
     } else {
         return studentName + " 회원님이 " + requestNotification.requestDate + "로 PT를 요청했습니다. 가능할까요?"
     }
}

function makeContentWhenRequestingChangingPtReservation(requestNotification, trainerName, studentName) {
    if(requestNotification.to_whom === 0) {
        return trainerName + "트레이너 님이 " + requestNotification.originDate + "에서 " + requestNotification.requestDate + "으로 PT를 변경 요청했습니다. 가능할까요?"
    } else {
        return studentName + " 회원님이 " + requestNotification.originDate+ "에서 " + requestNotification.requestDate + "으로 PT를 변경 요청했습니다. 가능할까요?"
    }
}

function makeContentWhenAcceptPtReservation(requestNotification) {
    return requestNotification.requestDate + " 로 예약완료 되었습니다.";
}

function makeContentWhnRejectPtReservation(requestNotification, trainerName, studentName) {
    if(requestNotification.to_whom === 0) {
        return trainerName + " 트레이너님이 일정이 맞지 요청이 거절되었습니다. 아래 메세지를 확인해주세요.";
    } else {
        return studentName + " 회원님이 일정이 맞지 요청이 거절되었습니다. 아래 메세지를 확인해주세요.";
    }
}


module.exports = {
    makeNewNotificationDecidingStudentOrTrainer: async function(newNotification) {
        newNotification.contents = await decideWhatMakeContentUsingType(newNotification);
        return await notificationRepository.createNewNotification(newNotification);
    },

    findStudentNotification: async function(studentId) {
        return await notificationRepository.findAllNotificationOfCertainStudent(studentId);
    },

    findTrainerNotification: async function(trainerId) {
        return await notificationRepository.findAllNotificationOfCertainTrainer(trainerId);
    }
};