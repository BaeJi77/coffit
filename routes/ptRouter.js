var express = require('express');
var router = express.Router();

const ptServie = require('../services/ptService');


router.get('/students/:studentId', getAllPtsOfStudent);
async function getAllPtsOfStudent(req, res, next) {
    let studentId = req.params.studentId;
    res.status(200).send(await ptServie.findAllPtsOfStudentUsingStudentId(studentId));
}

router.get('/trainers/:trainerId', getAllPtsOfTrainer);
async function getAllPtsOfTrainer(req, res, next) {
    let trainerId = req.params.trainerId;
    res.status(200).send(await ptServie.findAllPtsOfTrainerUsingTrainerId(trainerId));
}

router.post('/', postNewPt);
async function postNewPt(req, res, next) {
    res.status(200).send(await ptServie.makeNewPt(req.body));
}

// TODO pt update 되는 상황이 외부에서 요청이 오는지 생각
// router.put('/:ptId', updatePt);
// async function updatePt(req, res, next) {
//     let ptId = req.params.ptId;
//     res.status(200).send(await ptServie.updatePtWhenEndDateIsPassed(ptId, req.body));
// }


module.exports = router;