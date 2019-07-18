module.exports = (sequelize, DataTypes) => {
    return sequelize.define('pt', {
        state: {
            type: DataTypes.ENUM(
                'training', 'finished', 'scheduling'
            )
        },
        price: DataTypes.INTEGER,
        total_number: DataTypes.INTEGER,
        rest_number: DataTypes.INTEGER,
        start_date: DataTypes.DATE,
        end_date: DataTypes.DATE,
    }, {
        timestamps: true
    })
};