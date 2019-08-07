module.exports = (sequelize, DataTypes) => {
    return sequelize.define('trainer_picture', {
        picture_url: DataTypes.STRING,
        trainer_id: DataTypes.INTEGER
    }, {
        timestamps: true
    })
};