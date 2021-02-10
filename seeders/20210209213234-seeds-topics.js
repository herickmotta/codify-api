module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('topics', [
      {
        chapterId: 1,
        name: 'This is a topic from chapter 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        chapterId: 1,
        name: 'This is a topic from chapter 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        chapterId: 2,
        name: 'This is a topic from chapter 2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        chapterId: 2,
        name: 'This is a topic from chapter 2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        chapterId: 3,
        name: 'This is a topic from chapter 3',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        chapterId: 3,
        name: 'This is a topic from chapter 3',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        chapterId: 4,
        name: 'This is a topic from chapter 4',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        chapterId: 4,
        name: 'This is a topic from chapter 4',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        chapterId: 5,
        name: 'This is a topic from chapter 5',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        chapterId: 5,
        name: 'This is a topic from chapter 5',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        chapterId: 6,
        name: 'This is a topic from chapter 6',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        chapterId: 6,
        name: 'This is a topic from chapter 6',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        chapterId: 7,
        name: 'This is a topic from chapter 7',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        chapterId: 7,
        name: 'This is a topic from chapter 7',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        chapterId: 8,
        name: 'This is a topic from chapter 8',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        chapterId: 8,
        name: 'This is a topic from chapter 8',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

    ]);
  },

  down: async (queryInterface) => queryInterface.bulkDelete('topics', null, {}),
};
