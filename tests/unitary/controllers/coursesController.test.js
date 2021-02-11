/* eslint-disable no-undef */
const NotFoundError = require('../../../src/errors/NotFoundError');
const coursesController = require('../../../src/controllers/coursesController');

jest.mock('../../../src/models/Course');
const Course = require('../../../src/models/Course');
const ConflictError = require('../../../src/errors/ConflictError');

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
      id: 1,
      name: 'Course Test',
      description: 'test test',
      photo: 'photo',
      createdAt: '2021-02-11T16:34:56.316Z',
      updatedAt: '2021-02-11T16:34:56.316Z',
      chapters: [
        {
          id: 1,
          name: 'This is a chapter from course 1',
          topics: [
            {
              id: 1,
              name: 'This is a topic from chapter 1',
              theory: {
                id: 1,
                youtubeLink: 'https://www.youtube.com/watch?v=Ptbk2af68e8',
              },
              exercises: [
                {
                  id: 1,
                },
                {
                  id: 2,
                },
              ],
            },
          ],
        }],
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

describe('coursesController.createCourse', () => {
  it('Should return a created course', async () => {
    const course = {
      id: 1,
      name: 'This is a name',
      description: 'This is a description',
      photo: 'https://www.ThisIsAUrl.com',
    };
    await Course.findOne.mockResolvedValue(null);
    await Course.create.mockResolvedValue(course);

    const result = await coursesController.createCourse(course);

    expect(result).toEqual(expect.objectContaining(course));
  });

  it('Should throw error if given duplicate course name', async () => {
    const course = {
      id: 1,
      name: 'This is a name',
      description: 'This is a description',
      photo: 'https://www.ThisIsAUrl.com',
    };
    await Course.findOne.mockResolvedValue(course);

    const fn = async () => {
      await coursesController.create(course);
    };

    expect(fn).rejects.toThrow(ConflictError);
  });
});

describe('coursesController.editCourse', () => {
  it('Should throw error if given invalid id', async () => {
    const course = {
      id: 1,
      name: 'This is a name',
      description: 'This is a description',
      photo: 'https://www.ThisIsAUrl.com',
    };
    await Course.findByPk.mockResolvedValue(null);

    const fn = async () => {
      await coursesController.editCourse(course);
    };

    expect(fn).rejects.toThrow(NotFoundError);
  });

  it('Should return a edited course', async () => {
    const editedCourse = {
      id: 1,
      name: 'This is a edited name',
      description: 'This is a description',
      photo: 'https://www.ThisIsAUrl.com',
    };
    await Course.findByPk.mockResolvedValue({
      id: 1,
      name: 'This is a name',
      description: 'This is a description',
      photo: 'https://www.ThisIsAUrl.com',
      save: async () => Promise.resolve(),
    });

    const result = await coursesController.editCourse(editedCourse);

    expect(result).toEqual(expect.objectContaining({
      id: 1,
      name: 'This is a edited name',
      description: 'This is a description',
      photo: 'https://www.ThisIsAUrl.com',
    }));
  });
});
