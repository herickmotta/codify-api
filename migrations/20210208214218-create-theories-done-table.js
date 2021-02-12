module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('theoriesDone', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      theoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'theories',
          key: 'id',
        },
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('theoriesDone');
  },
};
