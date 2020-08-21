'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('recipes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      titleOne:{
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER
      },
      instruction: {
        type: Sequelize.TEXT
      },
      ingredient:{
        type: Sequelize.STRING
      },
      measure:{
        type: Sequelize.STRING
      },
      imgUrl: {
        type: Sequelize.STRING
      },
      imgOneUrl: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('recipes');
  }
};