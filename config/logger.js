var { createLogger, format, transports } = require('winston');


var logger = createLogger({
    format: format.combine(
        format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss"
        }),
        format.json()
    ),
    transports: [
        new transports.Console({
            level: "info",
            format: format.combine(
                format.colorize(),
                format.printf(
                    info => `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`
                )
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