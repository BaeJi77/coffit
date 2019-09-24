module.exports = (sequelize, DataTypes) => {
    return sequelize.define('mission', {
        date: DataTypes.DATEONLY,
        rate: DataTypes.INTEGER,
        comment: DataTypes.STRING,
        has_video: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        is_converted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        contents: DataTypes.STRING,
        trainer_id: DataTypes.INTEGER,
        student_id: DataTypes.INTEGER,
        pt_id: DataTypes.INTEGER
    })
};