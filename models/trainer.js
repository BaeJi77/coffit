module.exports = (sequelize, DataTypes) => {
    return sequelize.define('trainer', {
        username: DataTypes.STRING,
        price: {
            type: DataTypes.INTEGER,
            defaultValue: 10000
        },
        career: DataTypes.TEXT,
        description: DataTypes.TEXT,
        summary: DataTypes.TEXT,
        picture_url: DataTypes.STRING(1000),
        phone_number: DataTypes.STRING(15),
        total_star: DataTypes.INTEGER,
        num_review: DataTypes.INTEGER,
        access_token: DataTypes.STRING,
        fcm_token: DataTypes.STRING
    })
};