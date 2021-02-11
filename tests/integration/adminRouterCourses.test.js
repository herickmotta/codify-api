/* eslint-disable no-undef */
require('dotenv').config();
const jwt = require('jsonwebtoken');
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
describe('/api/v1/admin/courses', () => {
  const adminToken = jwt.sign({}, process.env.SECRET, { expiresIn: 60 * 60 });
  const headers = { Authorization: `JWT ${adminToken}` };
  it('Should return 401 if input header is faulty', async () => {
    const body = {
      name: 'its a course',
      description: 'hadushdsauihasdd',
    };

    const response = await agent.post('/api/v1/admin/courses').send(body);
    expect(response.status).toBe(401);
  });

  it('Should return 422 if input data is incorrect', async () => {
    const body = {
      name: 'its a course',
      description: 'hadushdsauihasdd',
    };

    const response = await agent.post('/api/v1/admin/courses').send(body).set(headers);
    expect(response.status).toBe(422);
  });

  it('Should return 200 if input data is correct', async () => {
    const body = {
      name: 'its a course',
      description: 'hadushdsauihasdd',
      photo: 'https://link.com',
    };

    const response = await agent.post('/api/v1/admin/courses').send(body).set(headers);
    expect(response.status).toBe(201);
  });

  it('Should return 409 if create a same name course', async () => {
    const body = {
      name: 'its a course',
      description: 'hadushdsauihasdd',
      photo: 'https://link.com',
    };

    await agent.post('/api/v1/admin/courses').send(body).set(headers);
    const response = await agent.post('/api/v1/admin/courses').send(body).set(headers);

    expect(response.status).toBe(409);
  });

  it('Should return 200 getting courses', async () => {
    const response = await agent.get('/api/v1/admin/courses').set(headers);
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(0);
  });

  it('Should return 200 editing a course', async () => {
    const queryRes = await sequelize.query('INSERT INTO courses (name,description,photo) VALUES ($1,$2,$3) RETURNING id', { bind: ['dshusduh', 'dushuhsdhuds', 'https://lalla.com'] });
    const { id } = queryRes[0][0];
    const response = await agent.put(`/api/v1/admin/courses/${id}`).set(headers);
    expect(response.status).toBe(200);
  });

  it('Should return 404 editing a invalid course', async () => {
    const response = await agent.put('/api/v1/admin/courses/2552').set(headers);
    expect(response.status).toBe(404);
  });

  it('Should return 200 getting a course', async () => {
    const queryRes = await sequelize.query('INSERT INTO courses (name,description,photo) VALUES ($1,$2,$3) RETURNING id', { bind: ['dshusduh', 'dushuhsdhuds', 'https://lalla.com'] });
    const { id } = queryRes[0][0];
    const response = await agent.get(`/api/v1/admin/courses/${id}`).set(headers);
    expect(response.status).toBe(200);
  });

  it('Should return 404 getting a invalid course', async () => {
    const response = await agent.get('/api/v1/admin/courses/2552').set(headers);
    expect(response.status).toBe(404);
  });

  it('Should return 200 deleting a course', async () => {
    const queryRes = await sequelize.query('INSERT INTO courses (name,description,photo) VALUES ($1,$2,$3) RETURNING id', { bind: ['dshusduh', 'dushuhsdhuds', 'https://lalla.com'] });
    const { id } = queryRes[0][0];
    const response = await agent.delete(`/api/v1/admin/courses/${id}`).set(headers);
    expect(response.status).toBe(200);
  });
  it('Should return 404 deleting a invalid course', async () => {
    const response = await agent.delete('/api/v1/admin/courses/32552').set(headers);
    expect(response.status).toBe(404);
  });
});
