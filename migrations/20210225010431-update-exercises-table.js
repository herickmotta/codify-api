module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('exercises', 'example', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('exercises', 'example');
  },
};
