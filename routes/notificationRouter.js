var express = require('express');
var router = express.Router();

const notificationService = require('../services/notificationService');

router.post('/', createNewNotification);
async function createNewNotification(req, res, next) {
    res.status(201).send(await notificationService.makeNewNotificationDecidingStudentOrTrainer(req.body));
}

router.get('/students/:studentId', getStudentNotifications);
async function getStudentNotifications(req, res, next) {
    res.status(200).send(await notificationService.findStudentNotification(req.params.studentId));
}

router.get('/trainers/:trainerId', getTrainerNotifications);
async function getTrainerNotifications(req, res, next) {
    res.status(200).send(await notificationService.findTrainerNotification(req.params.trainerId));
}


module.exports = router;