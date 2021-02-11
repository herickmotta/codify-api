/* eslint-disable no-await-in-loop */
/* eslint-disable no-undef */
const supertest = require('supertest');
const bcrypt = require('bcrypt');
const app = require('../../src/app');
const db = require('../../src/utils/database');

const agent = supertest(app);

const User = require('../../src/models/User');
const Course = require('../../src/models/Course');
const CourseUser = require('../../src/models/CourseUser');
const Session = require('../../src/models/Session');

beforeEach(async () => {
  const courses = [
    {
      name: 'JavaScript do zero!',
      description: 'Aprenda o básico meu bom!',
      photo: 'https://blog.dankicode.com/wp-content/uploads/2018/03/introdu%C3%A7%C3%A3o-ao-javascript.png',
    },
    {
      name: 'Node com TypeScript!',
      description: 'Aprenda a linguagem do momento!',
      photo: 'https://www.positronx.io/wp-content/uploads/2018/11/positronx-banner-1152-1.jpg',
    },
    {
      name: 'Aprenda a blindar sua aplicação Node com Jest!',
      description: 'Testes unitários e de integração, tudo que você precisa saber',
      photo: 'https://miro.medium.com/max/796/1*VxBKV4bcUJ4M7WCuCNmHWw.png',
    },
    {
      name: 'Do zero ao Full Stack',
      description: 'React, Node, Jest e Postgre',
      photo: 'https://media.bitdegree.org/storage/media/images/2018/11/What-Is-A-Full-Stack-Developer-and-Everything-You-Need-to-Know-to-Start.jpg',
    },
    {
      name: 'JavaScript do zero!',
      description: 'Aprenda o básico meu bom!',
      photo: 'https://blog.dankicode.com/wp-content/uploads/2018/03/introdu%C3%A7%C3%A3o-ao-javascript.png',

    },
  ];

  const password = 'bob12345';
  const passwordHashed = bcrypt.hashSync(password, 10);
  const user = {
    name: 'bob',
    email: 'bob@gmail.com',
    password: passwordHashed,
  };

  const insertedCourses = await Promise.all(courses.map((b) => Course.create(b)));
  const { id } = await User.create({ ...user });

  const relations = 3;

  for (let i = 0; i < relations.length; i++) {
    await CourseUser.create({ userId: id, courseId: insertedCourses[i].id });
  }
});

afterEach(async () => {
  await Session.destroy({ where: {} });
  await CourseUser.destroy({ where: {} });
  await Course.destroy({ where: {} });
  await User.destroy({ where: {} });
});

afterAll(async () => {
  await db.close();
});

describe('GET /api/v1/coureses/users/not-started', () => {
  it('should return with status 200 with all courses not started', async () => {
    const logedUser = await agent.post('/api/v1/users/signin').send({
      email: 'bob@gmail.com',
      password: 'bob12345',
    });

    const header = { Authorization: `JWT ${logedUser.body.token}` };
    const response = await agent.get('/api/v1/courses/users/not-started').set(header);

    expect(response.status).toBe(200);
  });
});
