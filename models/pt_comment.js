module.exports = (sequelize, DataTypes) => {
    return sequelize.define('ptComment', {
        comment: DataTypes.STRING,
        pt_id: DataTypes.INTEGER
    })
}