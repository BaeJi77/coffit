module.exports = (sequelize, DataTypes) => {
    return sequelize.define('student', {
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        age: {
            type: DataTypes.INTEGER,
            min: 1
        },
        picture_url: DataTypes.STRING,
        gender: {
            type: DataTypes.ENUM,
            values: ['남성', '여성', '대답을 원하지 않음']
        },
        phone_number: DataTypes.STRING,
        fcm_token: DataTypes.STRING,
        access_token: DataTypes.STRING
    }, {
        timestamps: true,
        charset: 'utf8',
        collate: 'utf8_general_ci'
    })
};