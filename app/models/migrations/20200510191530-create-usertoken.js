module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('UserTokens', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()')
      },
      token: {
        type: Sequelize.STRING
      },
      tokenType: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: ['signup', 'completion']
        }
      },
      userId: {
        type: Sequelize.UUID
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }),
  down: queryInterface => queryInterface.dropTable('UserTokens')
};
