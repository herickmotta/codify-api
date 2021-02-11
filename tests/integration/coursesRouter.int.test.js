/* eslint-disable no-await-in-loop */
/* eslint-disable no-undef */
const supertest = require('supertest');
const app = require('../../src/app');
const db = require('../../src/utils/database');

const agent = supertest(app);

const User = require('../../src/models/User');
const Course = require('../../src/models/Course');
const CourseUser = require('../../src/models/CourseUser');

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

  const user = {
    name: 'bob',
    email: 'bob@gmail.com',
    password: 'bob12345',
    passwordConfirmation: 'bob12345',
  };

  const insertedCourses = await Promise.all(courses.map((b) => Course.create(b)));
  const { id } = await User.create(user);

  const relations = [
    [id, 0],
    [id, 1],
    [id, 2],
  ];

  for (let i = 0; i < relations.length; i++) {
    const coursesStarted = insertedCourses[relations[id][i]];

    await CourseUser.create({ userId: id, courseId: coursesStarted.dataValues.id });
  }
});

afterEach(async () => {
  await CourseUser.destroy({ where: {} });
  await Course.destroy({ where: {} });
  await User.destroy({ where: {} });
});

afterAll(async () => {
  await db.close();
});

describe('GET /api/v1/coureses/users/not-started', () => {
  it('should return with status 200 with all courses not started', async () => {
    const logedUser = await agent.post('/api/v1/users/signup').send({
      email: 'bob@gmail.com',
      password: 'bob12345',
    });

    const header = { Authorization: `JWT ${logedUser.token}` };
    const response = await agent.get('/api/v1/courses/users/not-started').set(header);

    expect(response.status).toBe(200);
    expect(response.body[0]).toEqual(
      expect.objectContaining({
        name: 'Do zero ao Full Stack',
        description: 'React, Node, Jest e Postgre',
        photo: 'https://media.bitdegree.org/storage/media/images/2018/11/What-Is-A-Full-Stack-Developer-and-Everything-You-Need-to-Know-to-Start.jpg',
      }),
    );
  });
});
