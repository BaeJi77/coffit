module.exports = (sequelize, DataTypes) => {
    return sequelize.define('notification', {
        toWhom: DataTypes.INTEGER,
        contents: DataTypes.STRING,
        type: DataTypes.INTEGER,
        scheduleId: DataTypes.INTEGER,
        originDate: DataTypes.DATE,
        request_date: DataTypes.DATE
    }, {
        timestamp: true
    })
};
