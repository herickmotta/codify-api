/* eslint-disable no-undef */
const NotFoundError = require('../../../src/errors/NotFoundError');
const activitiesConstroller = require('../../../src/controllers/activitiesConstroller');

jest.mock('../../../src/models/TheoryDone');
const TheoryDone = require('../../../src/models/TheoryDone');

jest.mock('../../../src/models/ExerciseDone');
const ExerciseDone = require('../../../src/models/ExerciseDone');

jest.mock('../../../src/models/Exercise');
const Exercise = require('../../../src/models/Exercise');

jest.mock('../../../src/models/Theory');
const Theory = require('../../../src/models/Theory');

describe('activitiesConstroller.createActivityDone', () => {
  it('Should throw an error if given id invalid', async () => {
    const courseNotFound = null;
    const invalidId = 0;
    const userId = 1;
    const type = 'exercise';

    await Exercise.findByPk.mockResolvedValue(courseNotFound);

    const fn = async () => {
      await activitiesConstroller.createActivityDone(invalidId, userId, type);
    };

    expect(fn).rejects.toThrow(NotFoundError);
  });

  it('Should throw an error if given id invalid', async () => {
    const courseNotFound = null;
    const invalidId = 0;
    const userId = 1;
    const type = 'theory';

    await Theory.findByPk.mockResolvedValue(courseNotFound);

    const fn = async () => {
      await activitiesConstroller.createActivityDone(invalidId, userId, type);
    };

    expect(fn).rejects.toThrow(NotFoundError);
  });

  it('Should return exercise done save correctly', async () => {
    const type = 'exercise';
    const exerciseId = 1;
    const userId = 1;
    const newExerciseDone = {
      exerciseId,
      userId,
    };
    const expected = newExerciseDone;

    Exercise.findByPk.mockResolvedValue(true);
    ExerciseDone.create.mockResolvedValue(newExerciseDone);

    const result = await activitiesConstroller.createActivityDone(userId, exerciseId, type);

    expect(result).toBe(expected);
  });

  it('Should return theory done save correctly', async () => {
    const type = 'theory';
    const theoryId = 1;
    const userId = 1;
    const newExerciseDone = {
      theoryId,
      userId,
    };
    const expected = newExerciseDone;

    Theory.findByPk.mockResolvedValue(true);
    TheoryDone.create.mockResolvedValue(newExerciseDone);

    const result = await activitiesConstroller.createActivityDone(userId, theoryId, type);

    expect(result).toBe(expected);
  });
});
