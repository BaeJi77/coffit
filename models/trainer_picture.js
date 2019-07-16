module.exports = (sequelize, DataTypes) => {
    return sequelize.define('trainer_picture', {
        picture_url: DataTypes.STRING,
    }, {
        timestamps: true
    })
};