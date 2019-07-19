module.exports = (sequelize, DataTypes) => {
    return sequelize.define('banner', {
        picture_url: DataTypes.STRING,
        thumbnail_url: DataTypes.STRING
    }, {
        timestamps: true
    })
};