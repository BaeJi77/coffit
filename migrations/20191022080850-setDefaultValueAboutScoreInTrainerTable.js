'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.changeColumn('trainers', 'num_review', {
          type: Sequelize.INTEGER,
          defaultValue: 0
        }, {transaction: t}),
        queryInterface.changeColumn('trainers', 'total_star', {
          type: Sequelize.INTEGER,
          defaultValue: 0
        }, {transaction: t})
      ])
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return new Promise.all([
        queryInterface.changeColumn('trainers', 'num_review', {
          type: Sequelize.INTEGER,
          defaultValue: null
        }, {transaction: t}),
        queryInterface.changeColumn('trainers', 'total_star', {
          type: Sequelize.INTEGER,
          defaultValue: null
        }, {transaction: t})
      ])
    })
  }
};