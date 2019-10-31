'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/sequelize_config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});


db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Trainer = require('./trainer')(sequelize, Sequelize);
db.TrainerPicture = require('./trainer_picture')(sequelize, Sequelize);
db.Student = require('./student')(sequelize, Sequelize);
db.Pt = require('./pt')(sequelize, Sequelize);
db.Banner = require('./banner')(sequelize, Sequelize);
db.TrainerSchedule = require('./trainer_schedule')(sequelize, Sequelize);
db.Notification = require('./notification')(sequelize, Sequelize);
db.Schedule = require('./schedule')(sequelize, Sequelize);
db.PtComment = require('./pt_comment')(sequelize, Sequelize);
db.Mission = require('./mission')(sequelize, Sequelize);
db.ExerciseVideo = require('./exerciseVideo')(sequelize, Sequelize);
db.Review = require('./review')(sequelize, Sequelize);
db.ChattingRoom = require('./chatting_room')(sequelize, Sequelize);
db.ChattingMessage = require('./chatting_message')(sequelize, Sequelize);
db.MessageRead = require('./message_read')(sequelize, Sequelize);

db.Trainer.hasMany(db.TrainerPicture, {foreignKey: 'trainer_id'});
db.TrainerPicture.belongsTo(db.Trainer);

db.Trainer.hasMany(db.Pt, {foreignKey: 'trainer_id'});
db.Pt.belongsTo(db.Trainer);

db.Student.hasMany(db.Pt, {foreignKey: 'trainer_id'});
db.Pt.belongsTo(db.Student);

db.Trainer.hasMany(db.TrainerSchedule, {foreignKey: 'trainer_id'});
db.TrainerSchedule.belongsTo(db.Trainer);

db.Trainer.hasMany(db.Notification, {foreignKey: 'trainer_id'});
db.Notification.belongsTo(db.Trainer);

db.Student.hasMany(db.Notification, {foreignKey: 'student_id'});
db.Notification.belongsTo(db.Student);

db.Pt.hasMany(db.Schedule, {foreignKey: 'pt_id'});
db.Schedule.belongsTo(db.Pt);

db.Pt.hasMany(db.PtComment, {foreignKey: 'pt_id'});
db.PtComment.belongsTo(db.Pt);

db.Pt.hasMany(db.Mission, {foreignKey: 'pt_id'});
db.Mission.belongsTo(db.Pt);

db.Mission.hasOne(db.ExerciseVideo, {foreignKey: 'mission_id'});
db.ExerciseVideo.belongsTo(db.Mission);

db.Student.hasMany(db.Mission, {foreignKey: 'student_id'});

db.Trainer.hasMany(db.Review, {foreignKey: 'trainer_id'});
db.Review.belongsTo(db.Trainer);

db.Student.hasMany(db.ChattingRoom, {foreignKey: 'student_id'});
db.ChattingRoom.belongsTo(db.Student);

db.Trainer.hasMany(db.ChattingRoom, {foreignKey: 'trainer_id'});
db.ChattingRoom.belongsTo(db.Trainer);

db.ChattingRoom.hasMany(db.ChattingMessage, {foreignKey: 'chatting_room_id'});
db.ChattingMessage.belongsTo(db.ChattingRoom);

db.ChattingMessage.hasMany(db.MessageRead, {foreignKey: 'chatting_message_id'});
db.MessageRead.belongsTo(db.ChattingMessage);

db.ChattingRoom.hasMany(db.MessageRead, {foreignKey: 'chatting_room_id'});


db.Op = Sequelize.Op;

module.exports = db;
