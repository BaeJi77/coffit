module.exports = (sequelize, DataTypes) => {
    return sequelize.define('review', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        title: DataTypes.STRING,
        contexts: DataTypes.STRING,
        star: DataTypes.INTEGER,
        student_id: DataTypes.INTEGER,
        trainer_id: DataTypes.INTEGER
    })
};