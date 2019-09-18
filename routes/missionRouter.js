var express = require('express');
var router = express.Router();

const generatePreSignedUrl = require('../modules/generatePreSignedUrl');

router.get('/', getPresignedUrl);
async function getPresignedUrl(req, res, next) {
    let preSignedObject = await generatePreSignedUrl.getPostPreSignedUrl(req, res);
    res.status(200).send(preSignedObject);
}

module.exports = router;