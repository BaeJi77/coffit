module.exports = (sequelize, DataTypes) => {
    return sequelize.define('banner', {
        image_url: DataTypes.STRING,
        thumbnail_url: DataTypes.STRING
    }, {
        timestamps: true
    })
};