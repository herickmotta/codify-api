/* eslint-disable no-undef */
require('dotenv').config();
const jwt = require('jsonwebtoken');
const supertest = require('supertest');

const sequelize = require('../../src/utils/database');

const app = require('../../src/app');

const agent = supertest(app);

const cleatDataBase = async () => {
  await sequelize.query('DELETE FROM exercises;');
  await sequelize.query('DELETE FROM theories;');
  await sequelize.query('DELETE FROM topics;');
  await sequelize.query('DELETE FROM chapters;');
  await sequelize.query('DELETE FROM courses;');
};
const topicSeed = async () => {
  const insertCourse = await sequelize.query('INSERT INTO courses (name,description,photo) VALUES ($1,$2,$3) RETURNING id', { bind: ['dshusduh', 'dushuhsdhuds', 'https://lalla.com'] });
  const { id: courseId } = insertCourse[0][0];
  const insertChapter = await sequelize.query('INSERT INTO chapters (name,"courseId") VALUES ($1,$2) RETURNING id', { bind: ['dshusduh', courseId] });
  const { id: chapterId } = insertChapter[0][0];
  const insertTopic = await sequelize.query('INSERT INTO topics (name,"chapterId") VALUES ($1,$2) RETURNING id', { bind: ['dshusduh', chapterId] });
  const { id: topicId } = insertTopic[0][0];
  return topicId;
};
beforeEach(async () => {
  await cleatDataBase();
});

afterAll(async () => {
  await cleatDataBase();
  await sequelize.close();
});
describe('/api/v1/admin/exercises', () => {
  const adminToken = jwt.sign({}, process.env.SECRET, { expiresIn: 60 * 60 });
  const headers = { Authorization: `JWT ${adminToken}` };

  it('Should return 401 if input header is faulty', async () => {
    const body = {
    };

    const response = await agent.post('/api/v1/admin/exercises').send(body);
    expect(response.status).toBe(401);
  });

  it('Should return 200 if input data is correct', async () => {
    const topicId = await topicSeed();
    const body = {
      topicId,
    };
    const response = await agent.post('/api/v1/admin/exercises').send(body).set(headers);
    expect(response.status).toBe(201);
  });

  it('Should return 200 getting exercises', async () => {
    const response = await agent.get('/api/v1/admin/exercises').set(headers);
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(0);
  });

  it('Should return 200 editing a exercise', async () => {
    const topicId = await topicSeed();
    const queryRes = await sequelize.query('INSERT INTO exercises ("topicId") VALUES ($1) RETURNING id', { bind: [topicId] });
    const { id } = queryRes[0][0];
    const response = await agent.put(`/api/v1/admin/exercises/${id}`).set(headers);
    expect(response.status).toBe(200);
  });

  it('Should return 404 editing a invalid exercise', async () => {
    const response = await agent.put('/api/v1/admin/exercises/2552').set(headers);
    expect(response.status).toBe(404);
  });

  it('Should return 200 getting a exercise', async () => {
    const topicId = await topicSeed();
    const queryRes = await sequelize.query('INSERT INTO exercises ("topicId") VALUES ($1) RETURNING id', { bind: [topicId] });
    const { id } = queryRes[0][0];
    const response = await agent.get(`/api/v1/admin/exercises/${id}`).set(headers);
    expect(response.status).toBe(200);
  });

  it('Should return 404 getting a invalid exercise', async () => {
    const response = await agent.get('/api/v1/admin/exercises/2552').set(headers);
    expect(response.status).toBe(404);
  });

  it('Should return 200 deleting a exercise', async () => {
    const topicId = await topicSeed();
    const queryRes = await sequelize.query('INSERT INTO exercises ("topicId") VALUES ($1) RETURNING id', { bind: [topicId] });
    const { id } = queryRes[0][0];
    const response = await agent.delete(`/api/v1/admin/exercises/${id}`).set(headers);
    expect(response.status).toBe(200);
  });
  it('Should return 404 deleting a invalid exercise', async () => {
    const response = await agent.delete('/api/v1/admin/exercises/32552').set(headers);
    expect(response.status).toBe(404);
  });
});
