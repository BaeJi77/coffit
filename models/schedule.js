module.exports = (sequelize, DataTypes) => {
    return sequelize.define('schedule', {
        state: DataTypes.INTEGER,
        date: DataTypes.DATE,
        start_time: DataTypes.TIME,
        end_time: DataTypes.TIME,
        memo: DataTypes.TEXT,
        trainerId: DataTypes.INTEGER,
        studentId: DataTypes.INTEGER
    }, {
        timestamp: true
    })
}