const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

aws.config.loadFromPath(__dirname+'/../config/aws_s3.json');
const s3 = new aws.S3();


// TODO: 사진 용량 줄이기
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'coffit',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            let fileName = file.originalname;
            fileName = Date.now().toString() + '_' + fileName;
            cb(null, fileName);
        },
        acl: 'public-read'
    })
});

module.exports = upload;