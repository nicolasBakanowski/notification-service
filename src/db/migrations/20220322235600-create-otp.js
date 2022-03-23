'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('OTPs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
,
      },
      otp: Sequelize.STRING,
      expirationTime: Sequelize.DATE,
      verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
  
      }     
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('OTPs');
  }
};
