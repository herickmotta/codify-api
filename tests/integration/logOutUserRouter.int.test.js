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
  const password = 'bob12345';
  const passwordHashed = bcrypt.hashSync(password, 10);
  const user = {
    name: 'bob',
    email: 'bob@gmail.com',
    password: passwordHashed,
  };

  await User.create({ ...user });
});

afterEach(async () => {
  await Session.destroy({ where: {} });
  await User.destroy({ where: {} });
});

afterAll(async () => {
  await db.close();
});

describe('GET /api/v1/users/logout', () => {
  it('should return with status 201 with the given user loged', async () => {
    const logedUser = await agent.post('/api/v1/users/signin').send({
      email: 'bob@gmail.com',
      password: 'bob12345',
    });

    const header = { Authorization: `JWT ${logedUser.body.token}` };
    const response = await agent.post('/api/v1/users/logout').set(header);

    expect(response.status).toBe(200);
  });

  it('should return with status 401 with the given user not send token', async () => {
    const header = { Authorization: 'JWT ' };
    const response = await agent.post('/api/v1/users/logout').set(header);

    expect(response.status).toBe(401);
  });
});
