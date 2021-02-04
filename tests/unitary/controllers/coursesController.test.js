/* eslint-disable no-undef */
const NotFoundError = require('../../../src/errors/NotFoundError');
const coursesController = require('../../../src/controllers/coursesController');
// jest.mock('bcrypt', () => ({
//   compareSync: (plainPassword) => plainPassword === 'correct_password',
// }));

jest.mock('../../../src/models/Course');
const Course = require('../../../src/models/Course');

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
    };
    const validCourseId = 1;

    await Course.findByPk.mockResolvedValue(course);
    const result = await coursesController.findCourseById(validCourseId);

    expect(result).toEqual(expect.objectContaining({ ...course }));
  });
});
