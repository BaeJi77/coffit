const aws = require('aws-sdk');
const preSignedConfig = require('../config/aws_presigned_url');

const logger = require('../config/logger');

aws.config.loadFromPath(__dirname+'/../config/aws_s3.json');
const s3 = new aws.S3();

module.exports = {
    getPostPreSignedUrl: async function (exerciseVideoId, videoFormat) {
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
        let param = preSignedConfig.get('getPreSignedUrlConfig');
        param.key = "missions/origin/" + keyName + ".mp4";
        return s3.getSignedUrl('getObject', param);
    },

    deleteS3Object: function (keyName) {
        let param = preSignedConfig.get('getS3Bucket');
        param.Key = "missions/origin/" + keyName + ".mp4"; // We must convert video format to mp4
        return s3.deleteObject(param, (err, data) => {
            if(err) {
                logger.error(err);
                throw err;
            }
            console.log(data);
        })
    }
};