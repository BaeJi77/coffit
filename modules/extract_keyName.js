module.exports = function (awsLocationInformation) {
    let splitResult = awsLocationInformation.split('/');
    let splitLength = splitResult.length;
    return splitResult[splitLength -  1];
};