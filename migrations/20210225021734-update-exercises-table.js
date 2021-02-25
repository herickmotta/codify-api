module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('exercises', 'test', {
      type: Sequelize.TEXT,
      allowNull: false,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('exercises', 'test');
  },
};
