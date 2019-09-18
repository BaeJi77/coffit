const aws = require('aws-sdk');
const preSignedConfig = require('../config/aws_presigned_url');

aws.config.loadFromPath(__dirname+'/../config/aws_s3.json');
const s3 = new aws.S3();

module.exports = {
    getPostPreSignedUrl: async function (req, res) {
        let preSignedUrlObject;
        await s3.createPresignedPost(preSignedConfig.get('postPreSignedUrlConfig'), function (err, data) {
            if (err)
                console.log("Error",err);

            preSignedUrlObject = data;
        });
        return preSignedUrlObject;
    },

    getAccessPreSignedUrl: function (keyName) {
        let param = preSignedConfig.get('getPreSignedUrlConfig');
        param.key = keyName;
        return s3.getSignedUrl('getObject', param);
    }
};