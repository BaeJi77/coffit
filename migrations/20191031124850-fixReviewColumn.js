'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn('reviews', 'contents', {
          type: Sequelize.STRING
        }, {transaction: t}),
        queryInterface.removeColumn('reviews', 'contexts',
            {transaction: t})
      ])
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('reviews', 'contents',
            {transaction: t}),
        queryInterface.addColumn('reviews', 'contexts', {
          type: Sequelize.STRING
        }, {transaction: t})
      ])
    })
  }
};
