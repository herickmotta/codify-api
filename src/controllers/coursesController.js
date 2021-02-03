/* eslint-disable no-param-reassign */

const Course = require('../models/Course');
const NotFoundError = require('../errors/NotFoundError');

class CoursesController {
  async findCourseById(courseId) {
    const course = await Course.findByPk(courseId);
    if (!course) throw new NotFoundError();

    return course;
  }

  getAllCourses() {
    return Course.findAll();
  }
}

module.exports = new CoursesController();
