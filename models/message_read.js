module.exports = (sequelize, DataTypes) => {
    return sequelize.define('messageRead', {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        read: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        trainer_id: DataTypes.INTEGER,
        student_id: DataTypes.INTEGER,
        chatting_room_id: DataTypes.BIGINT.UNSIGNED,
        chatting_message_id: DataTypes.BIGINT.UNSIGNED
    }, {
        indexes: [
            {
                fields: ['chatting_room_id'],
                unique: false
            },
            {
                fields: ['chatting_room_id', 'trainer_id'],
                unique: false
            },
            {
                fields: ['chatting_room_id', 'student_id'],
                unique: false
            }
        ]
    })
};