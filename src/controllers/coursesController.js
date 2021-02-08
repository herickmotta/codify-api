/* eslint-disable no-param-reassign */

const Course = require('../models/Course');
const NotFoundError = require('../errors/NotFoundError');
const CoursesUser = require('../models/CoursesUser');
const ConflictError = require('../errors/ConflictError');

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
    const thisUserAlredyStartedCourse = await CoursesUser.findOne({ where: { courseId, userId } });
    if (thisUserAlredyStartedCourse) throw new ConflictError();

    await CoursesUser.create({ userId, courseId });
  }
}

module.exports = new CoursesController();
