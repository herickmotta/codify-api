/* eslint-disable no-undef */
const NotFoundError = require('../../../src/errors/NotFoundError');
const ConflictError = require('../../../src/errors/ConflictError');
const coursesController = require('../../../src/controllers/coursesController');

jest.mock('../../../src/models/Course');
const Course = require('../../../src/models/Course');

jest.mock('../../../src/models/CourseUser');
const CourseUser = require('../../../src/models/CourseUser');

jest.mock('../../../src/models/User');
const User = require('../../../src/models/User');

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

    await CourseUser.findOne.mockResolvedValue(courseStarted);
    const fn = async () => {
      await coursesController.startCourse({ userId, courseId });
    };

    expect(fn).rejects.toThrow(ConflictError);
  });

  it('Should throw a error with the given courseId is invalid', async () => {
    const courseStarted = true;
    const userId = 1;
    const courseId = 2;

    await CourseUser.findOne.mockResolvedValue(courseStarted);
    const fn = async () => {
      await coursesController.startCourse({ userId, courseId });
    };

    expect(fn).rejects.toThrow(ConflictError);
  });

  it('Should register the new course started', async () => {
    const courseStarted = false;
    const userId = 1;
    const courseId = 2;

    await CourseUser.findOne.mockResolvedValue(courseStarted);

    await CourseUser.create.mockResolvedValue();

    const result = await coursesController.startCourse({ userId, courseId });

    expect(result).toEqual();
  });
});

describe('coursesController.getAllCoursesThatUserStarted', () => {
  it('Should return a empty array of courses when the user dont have any course started', async () => {
    const courses = [];
    const userId = 2;

    await User.findOne.mockResolvedValue(courses);
    const result = await coursesController.getAllCoursesThatUserStarted(userId);

    expect(result).toEqual(expect.objectContaining([]));
  });

  it('Should return an array of courses when the user have started some course', async () => {
    const courses = [
      {
        id: 5,
        name: 'JavaScript do zero!',
        description: 'Aprenda o básico meu bom!',
        photo: 'photo',
      },
      {
        id: 6,
        name: 'Node com TypeScript!',
        description: 'Aprenda a linguagem do momento!',
        photo: 'photo',
      },
    ];
    const userId = 2;

    await User.findOne.mockResolvedValue(courses);
    const result = await coursesController.getAllCoursesThatUserStarted(userId);

    expect(result).toEqual(expect.objectContaining(courses));
  });
});
