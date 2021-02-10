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

  async getAllCoursesThatUserStarted(userId) {
    const userWithCourses = await User.findOne({
      where: { id: userId },
      include: Course,
    });

    const dirtyCourses = userWithCourses.courses;
    const cleanedCourses = dirtyCourses.map(({ dataValues }) => {
      delete dataValues.courseUser;
      delete dataValues.createdAt;
      delete dataValues.updatedAt;
      return dataValues;
    });

    return cleanedCourses;
  }
}

module.exports = new CoursesController();
