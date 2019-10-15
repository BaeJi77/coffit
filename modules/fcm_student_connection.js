const admin = require('firebase-admin');
const fcm_key = require('../config/fcm_key');

module.exports.studentPush = admin.initializeApp({
    credential: admin.credential.cert(fcm_key.student_key)
});
