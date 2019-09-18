var express = require('express');
var router = express.Router();

const generatePreSignedUrl = require('../modules/generate_preSignedUrl');

router.get('/preUrl', getPreSignedUrl);
async function getPreSignedUrl(req, res, next) {
    let preSignedObject = await generatePreSignedUrl.getPostPreSignedUrl(req, res);
    res.status(200).send(preSignedObject);
}

module.exports = router;