/* eslint-disable no-param-reassign */

const Course = require('../models/Course');
const NotFoundError = require('../errors/NotFoundError');
const CourseUser = require('../models/CourseUser');
const ConflictError = require('../errors/ConflictError');
const User = require('../models/User');

class CoursesController {
  async findCourseById(courseId) {
    const course = await Course.findByPk(courseId);
    if (!course) throw new NotFoundError();

    const { name, description, photo } = course;

    return {
      courseId, name, description, photo,
    };
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
      include: Course,
    });

    const { courses } = userWithCourses;

    return courses;
  }
}

module.exports = new CoursesController();
