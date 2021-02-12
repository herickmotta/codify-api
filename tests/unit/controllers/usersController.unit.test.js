/* eslint-disable no-undef */
const usersController = require('../../../src/controllers/usersController');

const User = require('../../../src/models/User');
const Course = require('../../../src/models/Course');
const Chapter = require('../../../src/models/Chapter');

jest.mock('../../../src/models/User');
jest.mock('../../../src/models/Course');
jest.mock('../../../src/models/Chapter');

const NotFoundError = require('../../../src/errors/NotFoundError');

jest.mock('sequelize');

jest.mock('bcrypt', () => ({
  hashSync: (password) => password,
}));

describe('signUpUser', () => {
  it('returns complete user when passed correct data', async () => {
    const newUser = {
      name: 'Fulano',
      email: 'fulano@fulano.com',
      password: '1111111111111111',
    };
    const expected = newUser;

    User.create.mockResolvedValue(newUser);

    const result = await usersController.create(newUser);
    expect(result).toBe(expected);
  });
});

describe('getUserProgress', () => {
  it('returns the progress value', async () => {
    const mockedCourse = {
      id: 1,
      name: 'JavaScript do zero!',
      description: 'Aprenda o básico meu bom!',
      photo: 'https://blog.dankicode.com/wp-content/uploads/2018/03/introdu%C3%A7%C3%A3o-ao-javascript.png',
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
            {
              id: 2,
              name: 'This is a topic from chapter 1',
              theory: {
                id: 2,
                youtubeLink: 'https://www.youtube.com/watch?v=Ptbk2af68e8',
              },
              exercises: [
                {
                  id: 3,
                },
                {
                  id: 4,
                },
              ],
            },
          ],
        },
      ],
    };

    const mockedAllExercisesDone = [{
      userId: 1,
      exerciseId: 1,
    }, {
      userId: 1,
      exerciseId: 2,
    }];

    const mockedAllTheoriesDone = [{
      userId: 1,
      theoryId: 1,
    }];

    const spy = jest.spyOn(usersController, '_getExercisesDone');
    spy.mockImplementation(() => mockedAllExercisesDone);

    const spyy = jest.spyOn(usersController, '_getTheoriesDone');
    spyy.mockImplementation(() => mockedAllTheoriesDone);

    const expected = { progress: 50 };

    Course.findByPk.mockResolvedValue(mockedCourse);

    const result = await usersController.getUserProgress(1, 1);
    expect(result).toEqual(expected);
  });

  it('returns a error when there is not a chapter or a topic registered in the course', async () => {
    const mockedCourse = {
      id: 1,
      name: 'JavaScript do zero!',
      description: 'Aprenda o básico meu bom!',
      photo: 'https://blog.dankicode.com/wp-content/uploads/2018/03/introdu%C3%A7%C3%A3o-ao-javascript.png',
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
        },
      ],
    };

    const mockedAllExercisesDone = [{
      userId: 1,
      exerciseId: 1,
    }, {
      userId: 1,
      exerciseId: 2,
    }];

    const mockedAllTheoriesDone = [{
      userId: 1,
      theoryId: 1,
    }];

    const spy = jest.spyOn(usersController, '_getExercisesDone');
    spy.mockImplementation(() => mockedAllExercisesDone);

    const spyy = jest.spyOn(usersController, '_getTheoriesDone');
    spyy.mockImplementation(() => mockedAllTheoriesDone);

    Course.findByPk.mockResolvedValue(mockedCourse);

    const fn = async () => {
      await usersController.getUserProgress(1, 1);
    };

    expect(fn).rejects.toThrow(NotFoundError);
  });
});

describe('getTopicsProgressByChapter', () => {
  it('returns a array of false boleans because there is no exercise and theory done', async () => {
    const mockedChapters = {
      id: 1,
      courseId: 1,
      name: 'This is a chapter from course 1',
      topics: [
        {
          id: 1,
          chapterId: 1,
          name: 'This is a topic from chapter 1',
          theory: {
            id: 1,
            topicId: 1,
            youtubeLink: 'https://www.youtube.com/watch?v=Ptbk2af68e8',
            theoryDones: [],
          },
          exercises: [
            {
              id: 1,
              topicId: 1,
              exerciseDones: [],
            },
            {
              id: 2,
              topicId: 1,
              exerciseDones: [],
            },
          ],
        },
        {
          id: 2,
          chapterId: 1,
          name: 'This is a topic from chapter 1',
          theory: {
            id: 2,
            topicId: 2,
            youtubeLink: 'https://www.youtube.com/watch?v=Ptbk2af68e8',
            theoryDones: [],
          },
          exercises: [
            {
              id: 3,
              topicId: 2,
              exerciseDones: [],
            },
            {
              id: 4,
              topicId: 2,
              exerciseDones: [],
            },
          ],
        },
      ],
    };
    const expected = [false, false];

    Chapter.findByPk.mockResolvedValue(mockedChapters);

    const result = await usersController.getTopicsProgressByChapter(1, 1, 1);
    expect(result).toEqual(expected);
  });

  it('returns a array [true,false] boleans because only the first topic is done', async () => {
    const mockedChapters = {
      id: 1,
      courseId: 1,
      name: 'This is a chapter from course 1',
      topics: [
        {
          id: 1,
          chapterId: 1,
          name: 'This is a topic from chapter 1',
          theory: {
            id: 1,
            topicId: 1,
            youtubeLink: 'https://www.youtube.com/watch?v=Ptbk2af68e8',
            theoryDones: [{
              userId: 1,
              theoryId: 1,
            }],
          },
          exercises: [
            {
              id: 1,
              topicId: 1,
              exerciseDones: [{
                userId: 1,
                exerciseId: 1,
              }],
            },
            {
              id: 2,
              topicId: 1,
              exerciseDones: [{
                userId: 1,
                exerciseId: 2,
              }],
            },
          ],
        },
        {
          id: 2,
          chapterId: 1,
          name: 'This is a topic from chapter 1',
          theory: {
            id: 2,
            topicId: 2,
            youtubeLink: 'https://www.youtube.com/watch?v=Ptbk2af68e8',
            theoryDones: [],
          },
          exercises: [
            {
              id: 3,
              topicId: 2,
              exerciseDones: [],
            },
            {
              id: 4,
              topicId: 2,
              exerciseDones: [],
            },
          ],
        },
      ],
    };
    const expected = [true, false];

    Chapter.findByPk.mockResolvedValue(mockedChapters);

    const result = await usersController.getTopicsProgressByChapter(1, 1, 1);
    expect(result).toEqual(expected);
  });

  it('returns a array [true,true] boleans both all the tasks of both topics is dons', async () => {
    const mockedChapters = {
      id: 1,
      courseId: 1,
      name: 'This is a chapter from course 1',
      topics: [
        {
          id: 1,
          chapterId: 1,
          name: 'This is a topic from chapter 1',
          theory: {
            id: 1,
            topicId: 1,
            youtubeLink: 'https://www.youtube.com/watch?v=Ptbk2af68e8',
            theoryDones: [{
              userId: 1,
              theoryId: 1,
            }],
          },
          exercises: [
            {
              id: 1,
              topicId: 1,
              exerciseDones: [{
                userId: 1,
                exerciseId: 1,
              }],
            },
            {
              id: 2,
              topicId: 1,
              exerciseDones: [{
                userId: 1,
                exerciseId: 2,
              }],
            },
          ],
        },
        {
          id: 2,
          chapterId: 1,
          name: 'This is a topic from chapter 1',
          theory: {
            id: 2,
            topicId: 2,
            youtubeLink: 'https://www.youtube.com/watch?v=Ptbk2af68e8',
            theoryDones: [{
              userId: 1,
              theoryId: 2,
            }],
          },
          exercises: [
            {
              id: 3,
              topicId: 2,
              exerciseDones: [{
                userId: 1,
                exerciseId: 3,
              }],
            },
            {
              id: 4,
              topicId: 2,
              exerciseDones: [{
                userId: 1,
                exerciseId: 4,
              }],
            },
          ],
        },
      ],
    };
    const expected = [true, true];

    Chapter.findByPk.mockResolvedValue(mockedChapters);

    const result = await usersController.getTopicsProgressByChapter(1, 1, 1);
    expect(result).toEqual(expected);
  });
});
