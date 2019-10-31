module.exports = (sequelize, DataTypes) => {
    return sequelize.define('chattingMessage', {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        type: DataTypes.STRING,
        opponent_name: DataTypes.STRING,
        opponent_picture: DataTypes.STRING,
        message: DataTypes.STRING,
        trainer_id: DataTypes.INTEGER,
        student_id: DataTypes.INTEGER,
        chatting_room_id: DataTypes.BIGINT.UNSIGNED
    }, {
        indexes: [
            {
                fields: ['chatting_room_id'],
                unique: false
            }
        ]
    })
};