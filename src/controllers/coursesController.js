/* eslint-disable no-param-reassign */

const compareAsc = require('date-fns/compareAsc');
const Course = require('../models/Course');
const Chapter = require('../models/Chapter');
const Topic = require('../models/Topic');
const Theory = require('../models/Theory');
const Exercise = require('../models/Exercise');
const NotFoundError = require('../errors/NotFoundError');
const chaptersController = require('./chaptersController');
const CourseUser = require('../models/CourseUser');
const ConflictError = require('../errors/ConflictError');
const User = require('../models/User');
const exercisesController = require('./exercisesController');
const theoriesController = require('./theoriesController');
const TheoryDone = require('../models/TheoryDone');
const ExerciseDone = require('../models/ExerciseDone');

class CoursesController {
  async findCourseById(courseId) {
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
    if (!courseData) throw new NotFoundError();
    return courseData;
  }

  async getCourseStartedById(courseId, userId) {
    const courseStarted = await CourseUser.findOne({ where: { userId, courseId } });
    if (courseStarted) return true;
    return false;
  }

  getAllCourses(queryConfig) {
    return Course.findAll(queryConfig);
  }

  async createCourse(courseParams) {
    const { name } = courseParams;
    const course = await Course.findOne({ where: { name } });
    if (course) throw new ConflictError('Course already exists');

    const createdCourse = await Course.create(courseParams);
    return createdCourse;
  }

  async editCourse(courseParams) {
    const {
      id, name, description, photo,
    } = courseParams;
    const course = await Course.findByPk(id);
    if (!course) throw new NotFoundError('Course not found');

    if (name) course.name = name;
    if (description) course.description = description;
    if (photo) course.photo = photo;

    await course.save();
    return course;
  }

  async destroyCourse(courseId) {
    const course = await Course.findByPk(courseId);
    if (!course) throw new NotFoundError('Chapter not found');

    const chapters = await Chapter.findAll({ where: { courseId } });
    const promises = chapters.map((chapter) => chaptersController.destroyChapter(chapter.id));
    await Promise.all(promises);
  }

  async startCourse({ userId, courseId }) {
    const thisUserAlredyStartedCourse = await CourseUser.findOne({ where: { courseId, userId } });
    if (thisUserAlredyStartedCourse) throw new ConflictError();

    await CourseUser.create({ userId, courseId });
  }

  async getAllCoursesStarted(userId) {
    const userWithCourses = await User.findByPk(
      userId, {
        include: [{
          model: Course,
          attributes: ['id', 'name', 'description', 'photo'],
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
                  include: [{
                    model: TheoryDone,
                  }],
                },
                {
                  model: Exercise,
                  attributes: ['id'],
                  include: [{
                    model: ExerciseDone,
                  }],
                },
              ],
            },
          },
          order: [[Chapter, Topic, Theory, TheoryDone, 'createdAt', 'DESC']],
        }],
      },
    );
    const { courses } = userWithCourses;
    console.log(courses);

    // descobrir aonde ele parou de estudar

    // ordenar a array por o último curso assistido mais recente

    // const coursesOrdered = courses.map(async (course) => {
    //   const theoryIdList = [];
    //   const exerciseIdList = [];
    //   course.chapters.forEach((chapter) => {
    //     if (!chapter) throw new NotFoundError();
    //     chapter.topics.forEach((topic) => {
    //       if (!topic || !topic.theory || !topic.exercises) throw new NotFoundError();

    //       theoryIdList.push(topic.theory.id);

    //       topic.exercises.forEach((exercise) => {
    //         exerciseIdList.push(exercise.id);
    //       });
    //     });
    //   });
    //   // / courses/:id/chapters/:chapterId/topics/:topicId
    //   const exercisesDone = await exercisesController.getExercisesDone(userId, exerciseIdList);
    //   const theoriesDone = await theoriesController.getTheoriesDone(userId, theoryIdList);

    //   const lastExerciseDone = exercisesDone[0];
    //   const lastTheorieDone = theoriesDone[0];
    //   const mostRecent = compareAsc(lastExerciseDone.updatedAt, lastTheorieDone.updatedAt);

    //   if (mostRecent === 1) {
    //     return course;
    //   } if (mostRecent === -1) {
    //     return course;
    //   }
    //   return course;
    // });

    // const coursesOrdeByLastSeenExerciseOrTheory = await Promise.all(coursesOrdered);

    return courses;
  }

  async getAllCoursesNotStarted(userId) {
    const coursesStarted = await this.getAllCoursesStarted(userId);
    const allCourses = await this.getAllCourses();

    const courses = allCourses.filter((el) => !coursesStarted.some((f) => f.id === el.id));

    return courses;
  }
}

module.exports = new CoursesController();
