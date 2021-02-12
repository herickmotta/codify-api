module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('chapters', [
      {
        courseId: 1,
        name: 'This is a chapter from course 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        courseId: 1,
        name: 'This is a another chapter from course 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        courseId: 2,
        name: 'This is a chapter from course 2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        courseId: 2,
        name: 'This is a another chapter from course 2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        courseId: 3,
        name: 'This is a chapter from course 3',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        courseId: 3,
        name: 'This is a another chapter from course 3',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        courseId: 4,
        name: 'This is a chapter from course 4',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        courseId: 4,
        name: 'This is a another chapter from course 4',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

    ]);
  },

  down: async (queryInterface) => queryInterface.bulkDelete('chapters', null, {}),
};
