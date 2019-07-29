module.exports = (sequelize, DataTypes) => {
    return sequelize.define('trainer_schedule', {
        start_time: DataTypes.DATE,
        available: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        timestamps: true
    })
};