module.exports = (sequelize, DataTypes) => {
    return sequelize.define('notification', {
        toWhom: DataTypes.INTEGER,
        contents: DataTypes.STRING,
        rejectMessage: DataTypes.STRING,
        type: DataTypes.INTEGER,
        scheduleId: DataTypes.INTEGER,
        originDate: DataTypes.DATE,
        requestDate: DataTypes.DATE
    }, {
        timestamp: true
    })
};
