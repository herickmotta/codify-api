module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('coursesUsers', [
      {
        courseId: 1,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        courseId: 2,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => queryInterface.bulkDelete('coursesUsers', null, {}),
};
