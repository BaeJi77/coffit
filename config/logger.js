var { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');

const logFormat = format.printf(info => `${info.timestamp} ${info.level}: ${JSON.stringify(info.message, null, 2)}`);

var logger = createLogger({
    level: 'info',/**/
    format: format.combine(
        format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        // Format the metadata object
        format.metadata({fillExcept: ['message', 'level', 'timestamp', 'label']}),
        format.json(),
        format.prettyPrint(),
        format.colorize(),
        format.splat()
    ),

    transports: [
        new transports.Console({
            level: "debug",
            format: format.combine(
                format.colorize(),
                logFormat
            )
        }),
        new transports.DailyRotateFile({
            level: 'error',
            filename: './log/%DATE%_error.log',
            datePattern: 'YYYY-MM-DD'
        }),
        new transports.DailyRotateFile({
            level: 'info',
            filename: './log/%DATE%.log',
            datePattern: 'YYYY-MM-DD'
        })
    ]
});


module.exports = logger;