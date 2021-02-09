/* eslint-disable no-param-reassign */

const Course = require('../models/Course');
const Chapter = require('../models/Chapter');
const Topic = require('../models/Topic');
const Theory = require('../models/Theory');
const Exercise = require('../models/Exercise');
const NotFoundError = require('../errors/NotFoundError');

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
}

module.exports = new CoursesController();
