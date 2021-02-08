/* eslint-disable no-param-reassign */

const Course = require('../models/Course');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');

class CoursesController {
  async findCourseById(courseId) {
    const course = await Course.findByPk(courseId);
    if (!course) throw new NotFoundError();

    return course;
  }

  getAllCourses(limit = null, offset = null) {
    return Course.findAll({ limit, offset });
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

  async deleteCourse(id) {
    const course = await Course.findByPk(id);
    if (!course) throw new NotFoundError('Course not found');
    // DELETAR DEPENDENCIAS E DEPOIS O CURSO
  }
}

module.exports = new CoursesController();
