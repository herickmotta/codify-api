module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('sessions',
      'token',
      {
        type: Sequelize.STRING,
        allowNull: false,
      });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('sessions', 'token');
  },
};
