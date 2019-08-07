module.exports = (sequelize, DataTypes) => {
    return sequelize.define('notification', {
        to_whom: DataTypes.INTEGER,
        contents: DataTypes.STRING,
        reject_message: DataTypes.STRING,
        type: DataTypes.INTEGER,
        schedule_id: DataTypes.INTEGER,
        origin_date: DataTypes.DATE,
        request_date: DataTypes.DATE,
        student_id: DataTypes.INTEGER,
        trainer_id: DataTypes.INTEGER
        //     {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     references: {
        //         model: sequelize.Student,
        //         key: 'id'
        //     }
        // }
    })
};
