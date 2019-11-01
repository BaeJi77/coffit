const logger = require('../config/logger');

module.exports = function (awsLocationInformation) {
    logger.info('[extract_keyName] find aws s3 data location');
    logger.info(awsLocationInformation);
    let splitResult = awsLocationInformation.split('/');
    let splitLength = splitResult.length;
    return splitResult[splitLength -  1];
};