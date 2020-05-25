module.exports = {
  up: (queryInterface) =>
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

  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {})
}
