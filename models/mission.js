module.exports = (sequelize, DataTypes) => {
    return sequelize.define('mission', {
        date: DataTypes.DATE,
        rate: DataTypes.INTEGER,
        comment: DataTypes.STRING,
        has_video: DataTypes.BOOLEAN,
        contents: DataTypes.STRING,
        trainer_id: DataTypes.INTEGER,
        student_id: DataTypes.INTEGER,
        pt_id: DataTypes.INTEGER
    })
};