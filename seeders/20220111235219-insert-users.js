'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('users', [
     {
       username: 'vini',
       email: 'vini@testando.com',
       password: '123',
       access_level: 1,
       created_at: new Date(),
       updated_at: new Date()
     },
     {
      username: 'vinicius',
      email: 'vinicius@testando.com',
      password: '123',
      access_level: 2,
      created_at: new Date(),
      updated_at: new Date()
    }
   ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {})
  }
};
