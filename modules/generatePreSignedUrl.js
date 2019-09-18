const aws = require('aws-sdk');
const preSignedConfig = require('../config/aws_presigned_url');

aws.config.loadFromPath(__dirname+'/../config/aws_s3.json');
const s3 = new aws.S3();


var preSignedUrl = s3.getSignedUrl('getObject', {
    Bucket: bucketName,
    Key: "new1.png",
    Expires: 10
});


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

    getGetPreSignedUrl: function (keyName) {
        let param = preSignedConfig.get('getPreSignedUrlConfig');
        param.key = keyName;
        return s3.getSignedUrl('getObject', param);
    }
};