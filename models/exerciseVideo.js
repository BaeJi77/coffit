module.exports = (sequelize, DataTypes) => {
    return sequelize.define('exerciseVideo', {
        date: DataTypes.DATE,
        url: DataTypes.STRING,
        thumbnail_url: DataTypes.STRING,
        time_tag: DataTypes.STRING,
        student_id: DataTypes.INTEGER,
        trainer_id: DataTypes.INTEGER,
        mission_id: DataTypes.INTEGER
    })
};