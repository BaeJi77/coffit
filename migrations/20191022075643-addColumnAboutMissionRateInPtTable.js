'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn('pts', 'total_rate', {
          type: Sequelize.INTEGER,
          defaultValue: 0
        }, { transaction: t }),
        queryInterface.addColumn('pts', 'rate_cnt', {
          type: Sequelize.INTEGER,
          defaultValue: 0
        }, { transaction: t })
      ])
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('pts', 'total_rate', {transaction: t}),
        queryInterface.removeColumn('pts', 'rate_cnt', {transaction: t}),
      ])
    })
  }
};
