module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users',
      'lastTaskSeenId',
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'LastTaskSeen',
          key: 'id',
        },
      });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('users', 'lastTaskSeenId');
  },
};
