module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('theories', [
      {
        topicId: 1,
        youtubeLink: 'https://www.youtube.com/watch?v=Ptbk2af68e8',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 2,
        youtubeLink: 'https://www.youtube.com/watch?v=Ptbk2af68e8',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 3,
        youtubeLink: 'https://www.youtube.com/watch?v=Ptbk2af68e8',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 4,
        youtubeLink: 'https://www.youtube.com/watch?v=Ptbk2af68e8',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 5,
        youtubeLink: 'https://www.youtube.com/watch?v=Ptbk2af68e8',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 6,
        youtubeLink: 'https://www.youtube.com/watch?v=Ptbk2af68e8',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 7,
        youtubeLink: 'https://www.youtube.com/watch?v=Ptbk2af68e8',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 8,
        youtubeLink: 'https://www.youtube.com/watch?v=Ptbk2af68e8',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 9,
        youtubeLink: 'https://www.youtube.com/watch?v=Ptbk2af68e8',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 10,
        youtubeLink: 'https://www.youtube.com/watch?v=Ptbk2af68e8',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 11,
        youtubeLink: 'https://www.youtube.com/watch?v=Ptbk2af68e8',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 12,
        youtubeLink: 'https://www.youtube.com/watch?v=Ptbk2af68e8',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 13,
        youtubeLink: 'https://www.youtube.com/watch?v=Ptbk2af68e8',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 14,
        youtubeLink: 'https://www.youtube.com/watch?v=Ptbk2af68e8',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 15,
        youtubeLink: 'https://www.youtube.com/watch?v=Ptbk2af68e8',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 16,
        youtubeLink: 'https://www.youtube.com/watch?v=Ptbk2af68e8',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => queryInterface.bulkDelete('theories', null, {}),
};
