var express = require('express');
var router = express.Router();

const notificationService = require('../services/notificationService');

const logger = require('../config/logger');

router.get('/students/:studentId', getStudentNotifications);
async function getStudentNotifications(req, res, next) {
    try {
        logger.info('[notificationRouter] [getStudentNotifications] studentId is : ' + req.params.studentId);
        res.status(200).send(await notificationService.findStudentNotification(req.params.studentId));    
    } catch (err) {
        next(err);
    }
}

router.get('/trainers/:trainerId', getTrainerNotifications);
async function getTrainerNotifications(req, res, next) {
    try {
        logger.info('[notificationRouter] [getTrainerNotifications] trainerId is : ' + req.params.studentId);
        res.status(200).send(await notificationService.findTrainerNotification(req.params.trainerId));
    } catch (err) {
        next(err);
    }
}


module.exports = router;