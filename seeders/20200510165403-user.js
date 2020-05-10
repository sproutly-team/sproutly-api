'use strict'

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Users',
      [
        {
          firstname: 'sproutly',
          lastname: 'owner',
          email: 'sproutlyowner@gmail.com',
          role: 'businessOwner'
        }
      ],
      {}
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Users', null, {})
}
