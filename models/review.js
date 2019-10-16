module.exports = (sequelzie, DataTypes) => {
    return sequelzie.define('review', {
        id: DataTypes.LONG,
        title: DataTypes.STRING,
        contexts: DataTypes.STRING,
        star: DataTypes.INTEGER,
        student_id: DataTypes.LONG,
        trainer_id: DataTypes.LONG
    })
};