var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var trainersRouter = require('./routes/trainerRouter');
var studentRouter = require('./routes/studentRouter');
var ptRouter = require('./routes/ptRouter');
var homeRouter = require('./routes/homeRouter');
var trainerScheduleRouter = require('./routes/trainerScheduleRouter');
var notificationRouter = require('./routes/notificationRouter');
var scheduleRouter = require('./routes/scheduleRouter');
var ptCommentRouter = require('./routes/ptCommentRouter');


var app = express();

const faker = require('./config/faker');

//init sequelize
var sequelize = require('./models').sequelize;
sequelize.sync({
  logging: console.log
}).then(() => {
  faker.makeFakeData();
});


const scheduler = require('./modules/node_scheduler');

//swagger api
const YAML = require('yamljs');
const swaggerDocument = YAML.load("./config/swagger.yaml");
const swaggerUi = require('swagger-ui-express');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//router
app.use('/', indexRouter);
app.use('/trainers', trainersRouter);
app.use('/students', studentRouter);
app.use('/pts', ptRouter);
app.use('/home', homeRouter);
app.use('/trainerSchedules', trainerScheduleRouter);
app.use('/notifications', notificationRouter);
app.use('/schedules', scheduleRouter);
app.use('/ptComment', ptCommentRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.error(err);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
