/* eslint-disable no-param-reassign */
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
                attributes: ['id', 'name', 'wording'],
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
    if (!course) throw new NotFoundError('Course not found');

    const chapters = await Chapter.findAll({ where: { courseId } });
    const promises = chapters.map((chapter) => chaptersController.destroyChapter(chapter.id));
    await Promise.all(promises);
    await course.destroy();
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
        }],
      },
    );
    const { courses } = userWithCourses;
    return courses;
  }

  async getAllCoursesNotStarted(userId) {
    const coursesStarted = await this.getAllCoursesStarted(userId);
    const allCourses = await this.getAllCourses();

    const courses = allCourses.filter((el) => !coursesStarted.some((f) => f.id === el.id));

    return courses;
  }

  async getAllCourseDataById(courseId, topicId, userId) {
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
                attributes: ['id'],
                include: {
                  model: TheoryDone,
                  where: { userId },
                  required: false,
                },
              },
              {
                model: Exercise,
                attributes: ['id'],
                include: {
                  model: ExerciseDone,
                  where: { userId },
                  required: false,
                },
              },
            ],
          },
        },
      },
    );
    if (!courseData) throw new NotFoundError();

    const list = [];
    let currentTopicIndex;
    let currentChapterIndex;

    const { chapters } = courseData;
    chapters.forEach((c, indexC) => {
      const chapterData = [];

      const { topics } = c;
      topics.forEach((t, indexT) => {
        let completed = true;
        const { theory, exercises } = t;

        if (theory.theoryDones && theory.theoryDones.length === 0) completed = false;
        if (completed) {
          exercises.forEach((e) => {
            if (e.exerciseDones && e.exerciseDones.length === 0) completed = false;
          });
        }
        chapterData.push({ id: t.id, name: t.name, completed });

        if (t.id === topicId) {
          currentTopicIndex = indexT;
          currentChapterIndex = indexC;
        }
      });

      list.push({ id: c.id, name: c.name, chapterData });
    });

    return { list, currentChapterIndex, currentTopicIndex };
  }
}

module.exports = new CoursesController();
