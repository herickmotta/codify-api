/* eslint-disable no-console */
/* eslint-disable no-undef */
require('dotenv').config();

const supertest = require('supertest');
const bcrypt = require('bcrypt');
const db = require('../../src/utils/database');

const app = require('../../src/app');

const agent = supertest(app);

const User = require('../../src/models/User');
const Course = require('../../src/models/Course');
const CourseUser = require('../../src/models/CourseUser');
const Chapter = require('../../src/models/Chapter');
const Topic = require('../../src/models/Topic');
const Theory = require('../../src/models/Theory');
const TheoryDone = require('../../src/models/TheoryDone');
const Session = require('../../src/models/Session');

let theoryTestId = 0;

async function cleanDataBase() {
  await TheoryDone.destroy({ where: {} });
  await Theory.destroy({ where: {} });
  await Topic.destroy({ where: {} });
  await Chapter.destroy({ where: {} });
  await CourseUser.destroy({ where: {} });
  await Course.destroy({ where: {} });
  await Session.destroy({ where: {} });
  await User.destroy({ where: {} });
}

async function createTheoryDone() {
  const password = '12345678';
  const passwordHashed = bcrypt.hashSync(password, 10);
  const userTest = {
    name: 'Usuario',
    email: 'testeint@email.com',
    password: passwordHashed,
  };
  const user = await User.create({ ...userTest });

  const courseTest = {
    name: 'JavaScript do zero!',
    description: 'Aprenda o básico meu bom!',
    photo: 'https://blog.dankicode.com/wp-content/uploads/2018/03/introdu%C3%A7%C3%A3o-ao-javascript.png',
  };
  const course = await Course.create({ ...courseTest });

  const relationCourseUser = [
    { userId: user.id, courseId: course.id },
  ];
  await CourseUser.bulkCreate(relationCourseUser);

  const chapterTest = {
    courseId: course.id,
    name: 'Primeiros Passos',
  };
  const chapter = await Chapter.create({ ...chapterTest });

  const topicTest = {
    chapterId: chapter.id,
    name: 'Primeiro Topico',
  };
  const topic = await Topic.create({ ...topicTest });

  const theoryTest = {
    topicId: topic.id,
    name: 'Teoria',
    youtubeLink: 'https://www.youtube.com/watch?v=tAGnKpE4NCI&ab_channel=Metallica',
  };
  const theory = await Theory.create({ ...theoryTest });

  const theoryDoneTest = {
    userId: user.id,
    theoryId: theory.id,
  };
  await TheoryDone.create({ ...theoryDoneTest });
  theoryTestId = theory.id;
}

beforeEach(async () => {
  await cleanDataBase();
  await createTheoryDone();
});

afterAll(async () => {
  await cleanDataBase();
  await db.close();
});

describe('DELETE /api/v1/lessons/:id', () => {
  it('should return status 200 after destroy exercise done', async () => {
    const logedUser = await agent.post('/api/v1/users/signin').send({
      email: 'testeint@email.com',
      password: '12345678',
    });
    const data = { type: 'theory' };
    const header = { Authorization: `JWT ${logedUser.body.token}` };

    const response = await agent.delete(`/api/v1/lessons/${theoryTestId}`).set(header, data);

    expect(response.status).toBe(200);
  });
});
