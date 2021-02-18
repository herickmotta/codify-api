module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('exercises', [
      {
        topicId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 11,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 11,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 13,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 13,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 14,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 14,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 15,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 15,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 16,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 16,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => queryInterface.bulkDelete('exercises', null, {}),
};
