const aws = require('aws-sdk');
const preSignedConfig = require('../config/aws_presigned_url');

const logger = require('../config/logger');

aws.config.loadFromPath(__dirname+'/../config/aws_s3.json');
const s3 = new aws.S3();

module.exports = {
    getPostPreSignedUrl: async function (exerciseVideoId, videoFormat) {
        logger.info('[s3_operator][getPostPreSignedUrl] exerciseVideoId: %d, videoFormat: %s', exerciseVideoId, videoFormat);
        let preSignedUrlObject;
        let param = preSignedConfig.get('postPreSignedUrlConfig');
        param.Fields.key = "missions/origin/" + exerciseVideoId + "." + videoFormat;
        await s3.createPresignedPost(param, (err, data) => {
            if (err) {
                logger.error(err);
                throw err;
            }

            preSignedUrlObject = data;
        });
        return preSignedUrlObject;
    },

    getAccessPreSignedUrl: function (keyName) {
        logger.info('[s3_operator][getAccessPreSignedUrl] keyName: %s', keyName);
        let param = preSignedConfig.get('getPreSignedUrlConfig');
        param.Key = "missions/origin/" + keyName;
        return s3.getSignedUrl('getObject', param);
    },

    deleteS3Object: function (keyName, format) {
        logger.info('[s3_operator][deleteS3Object] keyName: %s, format: %s', keyName, format);
        let param = preSignedConfig.get('getS3Bucket');
        param.Key = keyName + format; // We must convert video format to mp4
        return s3.deleteObject(param, (err, data) => {
            if(err) {
                logger.error(err);
                throw err;
            }
            logger.info(data);
        })
    }
};