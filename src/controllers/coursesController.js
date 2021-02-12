/* eslint-disable no-param-reassign */

const Course = require('../models/Course');
const Chapter = require('../models/Chapter');
const Topic = require('../models/Topic');
const Theory = require('../models/Theory');
const Exercise = require('../models/Exercise');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const CourseUser = require('../models/CourseUser');
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
