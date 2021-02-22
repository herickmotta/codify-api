/* eslint-disable no-undef */
const CourseNotStarted = require('../../../src/errors/CourseNotStarted');
const lastTaskSeenController = require('../../../src/controllers/lastTaskSeenController');

jest.mock('../../../src/models/LastTaskSeen');
const LastTaskSeen = require('../../../src/models/LastTaskSeen');

describe('lastTaskSeenController.createLastTaskSeen', () => {
  it('Should return the last task seen from user in this course', async () => {
    const course = {
      courseId: 1,
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

    const lastTaskSeen = {
      id: 1,
      userId: 1,
      courseId: 1,
      chapterId: 1,
      topicId: 1,
      theoryId: 1,
    };

    await LastTaskSeen.create.mockResolvedValue(lastTaskSeen);
    const result = await lastTaskSeenController.createLastTaskSeen(1, course);

    expect(result).toEqual(expect.objectContaining({ ...lastTaskSeen }));
  });
});

// describe('lastTaskSeenController.updateLastTaskSeen', () => {
//   it('Should return the updated last task seen from user in this course', async () => {
//     const lastTaskSeen = {
//       id: 1,
//       userId: 1,
//       courseId: 1,
//       chapterId: 1,
//       topicId: 1,
//       theoryId: 1,
//     };

//     const updateData = {
//       courseId: 1,
//       chapterId: 1,
//       topicId: 1,
//       type: 'Exercise',
//       exerciseId: 2,
//     };

//     const expect = {
//       id: 1,
//       userId: 1,
//       courseId: 1,
//       chapterId: 1,
//       topicId: 1,
//       exerciseId: 2,
//     };

//     await LastTaskSeen.findOne.mockResolvedValue(lastTaskSeen);

//     const userModelInstanceMock = { save: jest.fn() };
//     const userModelMock = { findByPk: jest.fn().mockResolvedValueOnce(userModelInstanceMock) };

//     const fn = async () => {
//       await lastTaskSeenController.updateLastTaskSeen(1, updateData);
//     };
//     expect(fn).toEqual(expect.objectContaining({ ...lastTaskSeen }));
//   });
// });
