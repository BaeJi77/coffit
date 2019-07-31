module.exports = (sequelize, DataTypes) => {
    return sequelize.define('schedule', {
        state: DataTypes.INTEGER,
        date: DataTypes.DATE,
        start_time: DataTypes.TIME,
        end_time: DataTypes.TIME,
        memo: DataTypes.STRING,
        past_schedule_id: DataTypes.INTEGER,
        trainer_id: DataTypes.INTEGER,
        student_id: DataTypes.INTEGER,
        pt_id: DataTypes.INTEGER
    })
};