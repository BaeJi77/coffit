module.exports = (sequelize, DataTypes) => {
    return sequelize.define('chattingRoom' , {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        student_name: DataTypes.STRING,
        student_picture: DataTypes.STRING,
        trainer_name: DataTypes.STRING,
        trainer_picture: DataTypes.STRING,
        last_message: DataTypes.STRING,
        trainer_id: DataTypes.INTEGER,
        student_id: DataTypes.INTEGER
    }, {
        indexes: [
            {
                fields: ['trainer_id'],
                unique: false
            },
            {
                fields: ['student_id'],
                unique: false
            }
        ]
    })
};