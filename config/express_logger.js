const expressWinston = require('express-winston');
const winston = require('winston');

module.exports = {
    logger: expressWinston.logger({
        transports: [
            new winston.transports.Console(),
            new winston.transports.DailyRotateFile({
                level: 'info',
                filename: './log/%DATE%.log',
                datePattern: 'YYYY-MM-DD'
            })
        ],
        format: winston.format.combine(
            winston.format.json(),
            winston.format.prettyPrint()
        ),
        meta: true, // optional: control whether you want to log the meta data about the request (default to true)
        msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
        expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
        colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
        ignoreRoute: function (req, res) {
            if(req.headers['user-agent'] === 'ELB-HealthChecker/2.0' || req.url === '/')
                return true;
            else
                return false;
        } // optional: allows to skip some log messages based on request and/or response
    })
};