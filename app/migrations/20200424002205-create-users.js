'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Users',
        'passcode',
        {
          type: Sequelize.STRING
        }
      ),
      queryInterface.addColumn(
        'Users',
        'activated',
        {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
        }
      ),
      queryInterface.addColumn(
        'Users',
        'activationToken',
        {
          type: Sequelize.STRING
        }
      ),
      queryInterface.addColumn(
        'Users',
        'isAdmin',
        {
          type: Sequelize.BOOLEAN,
          allowNull: false
        }
      ),
      queryInterface.addColumn(
        'Users',
        'leaveDays',
        {
          type: Sequelize.INTEGER
        }
      ),
      queryInterface.addColumn(
        'Users',
        'companyId',
        {
          type: Sequelize.INTEGER,
          onDelete: 'CASCADE',
          references: {
            model: 'Companies',
            key: 'id',
            as: 'companyId'
          }
        }
      ),
    ]);
  },

  down: (queryInterface, Sequelize) => {
  }
};
