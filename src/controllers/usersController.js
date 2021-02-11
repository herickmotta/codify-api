/* eslint-disable no-param-reassign */
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Course = require('../models/Course');
const Chapter = require('../models/Chapter');
const Topic = require('../models/Topic');
const Theory = require('../models/Theory');
const Exercise = require('../models/Exercise');
const TheoryDone = require('../models/TheoryDone');
const ExerciseDone = require('../models/ExerciseDone');

class UsersController {
  async create(userData) {
    userData.password = bcrypt.hashSync(userData.password, 10);

    const user = await User.create(userData);
    return user;
  }

  async getTopicsProgressByChapter(userId, courseId, chapterId) {
    const chapter = await Chapter.findByPk(chapterId, {
      include: [
        {
          model: Topic,
          include: [
            {
              model: Theory,
              include: {
                model: TheoryDone,
                where: { userId },
                required: false,
              },
            },
            {
              model: Exercise,
              include: {
                model: ExerciseDone,
                where: { userId },
                required: false,
              },
            },
          ],
        },
      ],
    });

    const progressList = [];
    const { topics } = chapter;

    topics.forEach((topic) => {
      let topicProgress = false;
      if (topic.theory.theoryDones.length !== 0) {
        topic.exercises.forEach((exercise) => {
          if (exercise.exerciseDones.length !== 0) {
            topicProgress = true;
          } else {
            topicProgress = false;
          }
        });
      }

      progressList.push(topicProgress);
    });

    return progressList;
  }
}

module.exports = new UsersController();
