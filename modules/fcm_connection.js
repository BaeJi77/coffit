const admin = require('firebase-admin');
const fcmKey = require('../config/fcm_key');

let studentPush = admin.initializeApp({
    credential: admin.credential.cert(fcmKey.student)
}, 'student');

let trainerPush = admin.initializeApp({
    credential: admin.credential.cert(fcmKey.trainer)
}, 'trainer');

module.exports = {
    studentPush: studentPush,
    trainerPush: trainerPush
};
