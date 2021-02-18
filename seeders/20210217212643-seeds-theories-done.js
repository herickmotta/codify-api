module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('theoriesDone', [
      {
        theoryId: 1,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        theoryId: 5,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => queryInterface.bulkDelete('theoriesDone', null, {}),
};
