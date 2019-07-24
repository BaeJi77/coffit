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
db.Schedule = require('./schedule')(sequelize, Sequelize);
db.TrainerSchedule = require('./trainer_schedule')(sequelize, Sequelize);

db.Trainer.hasMany(db.TrainerPicture);
db.TrainerPicture.belongsTo(db.Trainer);

db.Trainer.hasMany(db.Pt);
db.Pt.belongsTo(db.Trainer);

db.Student.hasMany(db.Pt);
db.Pt.belongsTo(db.Student);

db.Pt.hasMany(db.Schedule);
db.Schedule.belongsTo(db.Pt);

db.Trainer.hasMany(db.TrainerSchedule);
db.TrainerSchedule.belongsTo(db.Trainer);

db.Op = Sequelize.Op;

module.exports = db;
