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

    getAccessPreSignedUrl: function (exerciseVideoId) {
        let param = preSignedConfig.get('getPreSignedUrlConfig');
        param.Key = "missions/origin/" + exerciseVideoId + ".mp4";
        return s3.getSignedUrl('getObject', param);
    },

    deleteS3Object: function (exerciseVideoId) {
        let param = preSignedConfig.get('getS3Bucket');
        param.Key = "missions/origin/" + exerciseVideoId + ".mp4"; // We must convert video format to mp4
        return s3.deleteObject(param, (err, data) => {
            if(err) {
                logger.error(err);
                throw err;
            }
            console.log(data);
        })
    }
};