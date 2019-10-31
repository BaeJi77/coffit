var express = require('express');
var router = express.Router();
const fs = require('fs');


// router.get('/', getIndex);
//
//
// function getIndex (req, res, next) {
//     res.render('index', { title: 'Express' });
// }

router.get('/chatting/trainers', getChattingTrainer);
function getChattingTrainer(req, res, next) {
    fs.readFile(__dirname + '/../views/chatting_trainer.html', (err, data) => {
        res.end(data, 'utf-8');
    });
}

router.get('/chatting/students', getChattingStudent);
function getChattingStudent(req, res, next) {
    fs.readFile(__dirname + '/../views/chatting_student.html', (err, data) => {
        res.end(data, 'utf-8');
    });
}

module.exports = router;
