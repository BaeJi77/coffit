const convict = require('convict');

const bucketName = "coffit";
const minute = 60;

const config = convict({
    postPreSignedUrlConfig: {
        Bucket: bucketName,
        Expires: 30 * minute,
        Fields: {
            key: 'missions/origin/' + Date.now()
        },
        conditions: [
            {acl: 'public-read'},
            {success_action_status: "201"},
            // ['starts-with', '$key', ''],
            // ['content-length-range', 0, 100000],
            {'x-amz-algorithm': 'AWS4-HMAC-SHA256'},
        ]
    },
    getPreSignedUrlConfig: {
        Bucket: bucketName,
        Expires: 5 * minute
    }
});

config.validate();

module.exports = config;