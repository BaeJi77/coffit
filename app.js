var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var requestLogger = require('morgan');
var logger = require('./config/logger');
var expressLogger = require('./config/express_logger');
const Sentry = require('@sentry/node');
const sentryConfig = require('./config/sentry');

Sentry.init(sentryConfig);

var indexRouter = require('./routes/index');
var trainersRouter = require('./routes/trainerRouter');
var studentRouter = require('./routes/studentRouter');
var ptRouter = require('./routes/ptRouter');
var homeRouter = require('./routes/homeRouter');
var trainerScheduleRouter = require('./routes/trainerScheduleRouter');
var notificationRouter = require('./routes/notificationRouter');
var scheduleRouter = require('./routes/scheduleRouter');
var ptCommentRouter = require('./routes/ptCommentRouter');
var missionRouter = require('./routes/missionRouter');
var exerciseVideoRouter = require('./routes/exerciseVideoRouter');
var reviewRouter = require('./routes/reviewRouter');
var chattingRoomRouter = require('./routes/chattingRoomRouter');
var chattingMessageRouter = require('./routes/chattingMessageRouter');


var app = express();
app.use(Sentry.Handlers.requestHandler());

const faker = require('./config/faker');

//init sequelize
var sequelize = require('./models').sequelize;
sequelize.sync({
  force: false
}).then(() => {
  // faker.makeFakeData();
});


//swagger api
const YAML = require('yamljs');
const swaggerDocument = YAML.load("./config/swagger.yaml");
const swaggerUi = require('swagger-ui-express');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(requestLogger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// store request user information
app.use(expressLogger.logger);

//router
app.use('/', indexRouter);
app.use('/trainers', trainersRouter);
app.use('/students', studentRouter);
app.use('/pts', ptRouter);
app.use('/home', homeRouter);
app.use('/trainerSchedules', trainerScheduleRouter);
app.use('/notifications', notificationRouter);
app.use('/schedules', scheduleRouter);
app.use('/ptComments', ptCommentRouter);
app.use('/missions', missionRouter);
app.use('/exerciseVideos', exerciseVideoRouter);
app.use('/reviews', reviewRouter);
app.use('/chattingRooms', chattingRoomRouter);
app.use('/chattingMessages', chattingMessageRouter);

app.use(Sentry.Handlers.errorHandler());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  createError(404);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  logger.error(err.stack);
  console.error(err);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
