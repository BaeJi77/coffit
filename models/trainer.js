module.exports = (sequelize, DataTypes) => {
    return sequelize.define('trainer', {
        username: DataTypes.STRING,
        price: {
            type: DataTypes.INTEGER,
            defaultValue: 10000
        },
        email: DataTypes.STRING,
        career: DataTypes.TEXT,
        description: DataTypes.TEXT,
        summary: DataTypes.TEXT,
        picture_url: DataTypes.STRING(1000),
        phone_number: DataTypes.STRING(15),
        total_star: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        num_review: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        access_token: DataTypes.STRING,
        fcm_token: DataTypes.STRING
    })
};