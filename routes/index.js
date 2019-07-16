var express = require('express');
var router = express.Router();


router.get('/', getIndex);


function getIndex (req, res, next) {
    res.render('indexs.js', { title: 'Express' });
};


module.exports = router;
