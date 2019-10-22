module.exports = (sequelize, DataTypes) => {
    return sequelize.define('pt', {
        state: DataTypes.INTEGER,
        price: DataTypes.INTEGER,
        total_number: DataTypes.INTEGER,
        rest_number: DataTypes.INTEGER,
        start_date: DataTypes.DATE,
        end_date: DataTypes.DATE,
        pt_room: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        trainer_id: DataTypes.INTEGER,
        student_id: DataTypes.INTEGER,
        total_rate: DataTypes.INTEGER,
        rate_cnt: DataTypes.INTEGER
    })
};