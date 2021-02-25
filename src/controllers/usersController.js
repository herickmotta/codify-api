/* eslint-disable no-useless-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Course = require('../models/Course');
const CourseUser = require('../models/CourseUser');
const Chapter = require('../models/Chapter');
const Topic = require('../models/Topic');
const Theory = require('../models/Theory');
const Exercise = require('../models/Exercise');
const TheoryDone = require('../models/TheoryDone');
const ExerciseDone = require('../models/ExerciseDone');
const NotFoundError = require('../errors/NotFoundError');
const exercisesController = require('./exercisesController');
const theoriesController = require('./theoriesController');

class UsersController {
  async create(userData) {
    userData.password = bcrypt.hashSync(userData.password, 10);

    const user = await User.create(userData);
    return user;
  }

  async getUserProgress(userId, courseId) {
    const userCourse = await CourseUser.findOne({ where: { userId, courseId } });
    if (!userCourse) {
      return { progress: 0 };
    }

    const courseData = await Course.findByPk(
      courseId, {
        include: {
          model: Chapter,
          attributes: ['id', 'name'],
          include: {
            model: Topic,
            attributes: ['id', 'name'],
            include: [
              {
                model: Theory,
                attributes: ['id', 'youtubeLink'],
              },
              {
                model: Exercise,
                attributes: ['id'],
              },
            ],
          },
        },
      },
    );

    const theoryIdList = [];
    const exerciseIdList = [];

    courseData.chapters.forEach((chapter) => {
      if (!chapter) throw new NotFoundError();
      chapter.topics.forEach((topic) => {
        if (!topic || !topic.theory || topic.exercises.length === 0) throw new NotFoundError();

        theoryIdList.push(topic.theory.id);

        topic.exercises.forEach((exercise) => {
          exerciseIdList.push(exercise.id);
        });
      });
    });

    const exercisesDone = await exercisesController.getExercisesDone(userId, exerciseIdList);
    const theoriesDone = await theoriesController.getTheoriesDone(userId, theoryIdList);

    const allCourseTasks = [...theoryIdList, ...exerciseIdList];
    const allTasksDone = [...exercisesDone, ...theoriesDone];

    const progress = Math.round((allTasksDone.length / allCourseTasks.length) * 100);

    return { progress };
  }

  async getTopicsProgressByChapter(userId, chapterId) {
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
      let topicProgress = true;
      if (topic.theory.theoryDones.length === 0) {
        topicProgress = false;
      } else {
        topic.exercises.forEach((exercise) => {
          if (exercise.exerciseDones.length === 0) {
            topicProgress = false;
            return;
          }
        });
      }

      progressList.push(topicProgress);
    });

    return progressList;
  }

  sendEmailToRecoverPassword(userData) {
    const { id, email, name} = userData;
    const url = await this.generateUrl(id);

    this.sendEmail(email, name, url);
  }
}

module.exports = new UsersController();
