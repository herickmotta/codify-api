module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('lastTaskSeen', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      theoryId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'theories',
          key: 'id',
        },
      },
      courseId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'courses',
          key: 'id',
        },
        chapterId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'chapters',
            key: 'id',
          },
        },
        topicId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'topics',
            key: 'id',
          },
        },
        exerciseId: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'exercises',
            key: 'id',
          },
        },
        createdAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        updatedAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('lastTaskSeen');
  },
};
