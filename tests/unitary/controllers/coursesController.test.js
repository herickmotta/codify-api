/* eslint-disable no-undef */
const NotFoundError = require('../../../src/errors/NotFoundError');
const ConflictError = require('../../../src/errors/ConflictError');
const coursesController = require('../../../src/controllers/coursesController');

jest.mock('../../../src/models/Course');
const Course = require('../../../src/models/Course');

jest.mock('../../../src/models/CoursesUser');
const CoursesUser = require('../../../src/models/CoursesUser');

describe('coursesController.findCourseById', () => {
  it('Should throw an error if given id invalid', async () => {
    const courseNotFound = null;
    const invalidCourseId = null;

    await Course.findByPk.mockResolvedValue(courseNotFound);

    const fn = async () => {
      await coursesController.findCourseById(invalidCourseId);
    };

    expect(fn).rejects.toThrow(NotFoundError);
  });

  it('Should return a course if given id valid', async () => {
    const course = {
      courseId: 1,
      name: 'Course Test',
      description: 'test test',
      photo: 'photo',
    };
    const validCourseId = 1;

    await Course.findByPk.mockResolvedValue(course);
    const result = await coursesController.findCourseById(validCourseId);

    expect(result).toEqual(expect.objectContaining({ ...course }));
  });
});

describe('coursesController.getAllCourses', () => {
  it('Should return a empty array of courses when we dont have courses', async () => {
    const courses = [];

    await Course.findByPk.mockResolvedValue(courses);
    const result = await coursesController.getAllCourses();

    expect(result).toEqual(expect.objectContaining([]));
  });
});

describe('coursesController.startCourse', () => {
  it('Should throw a error with the given user has alredy started the course', async () => {
    const courseStarted = true;
    const userId = 1;
    const courseId = 2;

    await CoursesUser.findOne.mockResolvedValue(courseStarted);
    const fn = async () => {
      await coursesController.startCourse({ userId, courseId });
    };

    expect(fn).rejects.toThrow(ConflictError);
  });

  it('Should throw a error with the given courseId is invalid', async () => {
    const courseStarted = true;
    const userId = 1;
    const courseId = 2;

    await CoursesUser.findOne.mockResolvedValue(courseStarted);
    const fn = async () => {
      await coursesController.startCourse({ userId, courseId });
    };

    expect(fn).rejects.toThrow(ConflictError);
  });

  it('Should register the new course started', async () => {
    const courseStarted = false;
    const userId = 1;
    const courseId = 2;

    await CoursesUser.findOne.mockResolvedValue(courseStarted);

    await CoursesUser.create.mockResolvedValue();

    const result = await coursesController.startCourse({ userId, courseId });

    expect(result).toEqual();
  });
});
