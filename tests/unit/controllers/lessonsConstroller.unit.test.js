/* eslint-disable no-undef */
const lessonsConstroller = require('../../../src/controllers/lessonsConstroller');

jest.mock('../../../src/models/TheoryDone');
const TheoryDone = require('../../../src/models/TheoryDone');

jest.mock('../../../src/models/ExerciseDone');
const ExerciseDone = require('../../../src/models/ExerciseDone');

describe('lessonsConstroller.createLessonDone', () => {
  it('Should return exercise done save correctly', async () => {
    const type = 'exercise';
    const exerciseId = 1;
    const userId = 1;
    const newExerciseDone = {
      exerciseId,
      userId,
    };
    const expected = newExerciseDone;

    ExerciseDone.create.mockResolvedValue(newExerciseDone);

    const result = await lessonsConstroller.createLessonDone(userId, exerciseId, type);

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

    TheoryDone.create.mockResolvedValue(newExerciseDone);

    const result = await lessonsConstroller.createLessonDone(userId, theoryId, type);

    expect(result).toBe(expected);
  });
});
