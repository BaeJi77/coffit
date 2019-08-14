var winston = require('winston');
var winstonDaily = require('winston-daily-rotate-file');
var moment = require('moment');

function customTimeStamp() {
    return moment().format('YYYY-MM-DD HH:mm:ss');
}

var logger = new (winston.loggers) ({
    transports: [
        new (winstonDaily) ({
            name: 'info-log',
            filename: '~/log/daily',
            datePattern: 'YYYY-MM-dd.log',
            level: 'info',
            colorize: false,
            showLevel: true,
            json: true,
            timestamp: customTimeStamp
        }),
        new (winston.transports.Console) ({
            name: 'info-console',
            colorize: true,
            level: 'info',
            showLevel: true,
            json: true,
            timestamp: customTimeStamp
        })
    ],
    exceptionHandlers: [
        new (winstonDaily) ({
            name: 'exception-log',
            filename: '~/log/exception',
            datePattern: 'YYYY-MM-dd.log',
            colorize: false,
            level: 'error',
            showLevel: true,
            json: true,
            timestamp: customTimeStamp
        }),
        new (winston.transports.Console) ({
            name: 'exception-console',
            colorize: true,
            level: 'error',
            showLevel: true,
            json: true,
            timestamp: customTimeStamp
        })
    ]
});

module.exports = logger;