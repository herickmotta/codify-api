/* eslint-disable no-param-reassign */

const Course = require('../models/Course');
const Chapter = require('../models/Chapter');
const Topic = require('../models/Topic');
const Theory = require('../models/Theory');
const Exercise = require('../models/Exercise');
const NotFoundError = require('../errors/NotFoundError');
const CourseUser = require('../models/CourseUser');
const ConflictError = require('../errors/ConflictError');
const User = require('../models/User');

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
                attributes: ['youtubeLink'],
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

  getAllCourses() {
    return Course.findAll();
  }

  async startCourse({ userId, courseId }) {
    const thisUserAlredyStartedCourse = await CourseUser.findOne({ where: { courseId, userId } });
    if (thisUserAlredyStartedCourse) throw new ConflictError();

    await CourseUser.create({ userId, courseId });
  }

  async getAllCoursesStarted(userId) {
    const userWithCourses = await User.findOne({
      where: { id: userId },
      include: [{ model: Course, attributes: ['id', 'name', 'description', 'photo'] }],
    });

    const { courses } = userWithCourses;

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
