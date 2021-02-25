/* eslint-disable no-undef */
jest.mock('@sendgrid/mail');
const sgMail = require('@sendgrid/mail');
const usersController = require('../../../src/controllers/usersController');
const exercisesController = require('../../../src/controllers/exercisesController');
const theoriesController = require('../../../src/controllers/theoriesController');
const sessionController = require('../../../src/controllers/sessionController');

const User = require('../../../src/models/User');
const Course = require('../../../src/models/Course');
const Chapter = require('../../../src/models/Chapter');
const CourseUser = require('../../../src/models/CourseUser');

jest.mock('../../../src/models/User');
jest.mock('../../../src/models/Course');
jest.mock('../../../src/models/Chapter');
jest.mock('../../../src/models/CourseUser');

const NotFoundError = require('../../../src/errors/NotFoundError');
const htmlEmail = require('../../../src/utils/htmlEmail');

jest.mock('sequelize');

jest.mock('bcrypt', () => ({
  hashSync: (password) => password,
}));

jest.mock('uuid', () => ({
  v4: () => '1234',
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
    const mockedCourseUser = {
      id: 1,
      userId: 1,
      courseId: 1,
    };

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

    const spy = jest.spyOn(exercisesController, 'getExercisesDone');
    spy.mockImplementation(() => mockedAllExercisesDone);

    const spyy = jest.spyOn(theoriesController, 'getTheoriesDone');
    spyy.mockImplementation(() => mockedAllTheoriesDone);

    const expected = { progress: 50 };

    CourseUser.findOne.mockResolvedValue(mockedCourseUser);
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

    const spy = jest.spyOn(exercisesController, 'getExercisesDone');
    spy.mockImplementation(() => mockedAllExercisesDone);

    const spyy = jest.spyOn(theoriesController, 'getTheoriesDone');
    spyy.mockImplementation(() => mockedAllTheoriesDone);

    Course.findOne.mockResolvedValue(mockedCourse);

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

describe('sendEmailToRecoverPassword', () => {
  it('should call sgMail with message', async () => {
    const userData = {
      id: 1,
      email: 'jose@jose.com',
      name: 'Jose',
    };

    const msg = {
      to: userData.email,
      from: 'codifyschools@gmail.com',
      subject: 'Recover your password',
      html: htmlEmail(userData.name, 'http://localhost:3000/'),
    };

    const spyCreateSession = jest.spyOn(sessionController, 'createRecoverPasswordSession');
    spyCreateSession.mockImplementation(() => {});
    const spyGenerateUrl = jest.spyOn(usersController, 'generateUrl');
    spyGenerateUrl.mockImplementation(() => 'http://localhost:3000/');

    await usersController.sendEmailToRecoverPassword(userData);

    expect(sgMail.send).toHaveBeenCalled();
    expect(sgMail.send).toHaveBeenCalledWith(msg);
  });
});
