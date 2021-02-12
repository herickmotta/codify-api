/* eslint-disable no-undef */
require('dotenv').config();
const supertest = require('supertest');

const sequelize = require('../../src/utils/database');

const app = require('../../src/app');

const agent = supertest(app);

jest.setTimeout(1000 * 60);

const cleatDataBase = async () => {
  await sequelize.query('DELETE FROM exercises;');
  await sequelize.query('DELETE FROM theories;');
  await sequelize.query('DELETE FROM topics;');
  await sequelize.query('DELETE FROM chapters;');
  await sequelize.query('DELETE FROM courses;');
};

beforeEach(async () => {
  await cleatDataBase();
});

afterAll(async () => {
  await cleatDataBase();
  await sequelize.close();
});

describe('POST /api/v1/admin/sign-in', () => {
  it('Should return 422 if there is a faulty param', async () => {
    const body = {
      username: '',
    };

    const response = await agent.post('/api/v1/admin/sign-in').send(body);

    expect(response.status).toBe(422);
  });

  it('Should return 401 if password is not correct', async () => {
    const body = {
      username: process.env.ADMIN_USERNAME,
      password: 'wrong',
    };

    const response = await agent.post('/api/v1/admin/sign-in').send(body);

    expect(response.status).toBe(401);
  });

  it('Should return 401 if username is not correct', async () => {
    const body = {
      username: 'wrongggg',
      password: process.env.ADMIN_PASSWORD,
    };

    const response = await agent.post('/api/v1/admin/sign-in').send(body);
    expect(response.status).toBe(401);
  });

  it('Should return 200 if input data is correct', async () => {
    const body = {
      username: process.env.ADMIN_USERNAME,
      password: process.env.ADMIN_PASSWORD,
    };

    const response = await agent.post('/api/v1/admin/sign-in').send(body);
    expect(response.status).toBe(200);
  });
});
