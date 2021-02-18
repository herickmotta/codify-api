module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('exercisesDone', [
      {
        exerciseId: 9,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        exerciseId: 10,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        exerciseId: 1,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        exerciseId: 2,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => queryInterface.bulkDelete('exercisesDone', null, {}),
};
