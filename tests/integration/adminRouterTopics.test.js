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
const chapterSeed = async () => {
  const insertCourse = await sequelize.query('INSERT INTO courses (name,description,photo) VALUES ($1,$2,$3) RETURNING id', { bind: ['dshusduh', 'dushuhsdhuds', 'https://lalla.com'] });
  const { id: courseId } = insertCourse[0][0];
  const insertChapter = await sequelize.query('INSERT INTO chapters (name,"courseId") VALUES ($1,$2) RETURNING id', { bind: ['dshusduh', courseId] });
  const { id: chapterId } = insertChapter[0][0];
  return chapterId;
};
beforeEach(async () => {
  await cleatDataBase();
});

afterAll(async () => {
  await cleatDataBase();
  await sequelize.close();
});
describe('/api/v1/admin/topics', () => {
  const adminToken = jwt.sign({}, process.env.SECRET, { expiresIn: 60 * 60 });
  const headers = { Authorization: `JWT ${adminToken}` };

  it('Should return 401 if input header is faulty', async () => {
    const body = {
      name: 'its a topic',
    };

    const response = await agent.post('/api/v1/admin/topics').send(body);
    expect(response.status).toBe(401);
  });

  it('Should return 422 if input data is incorrect', async () => {
    const body = {
    };

    const response = await agent.post('/api/v1/admin/topics').send(body).set(headers);
    expect(response.status).toBe(422);
  });

  it('Should return 200 if input data is correct', async () => {
    const chapterId = await chapterSeed();
    const body = {
      name: 'its a topic',
      chapterId,
    };
    const response = await agent.post('/api/v1/admin/topics').send(body).set(headers);
    expect(response.status).toBe(201);
  });

  it('Should return 409 if create a same name topic', async () => {
    const chapterId = await chapterSeed();
    const body = {
      name: 'its a topic',
      chapterId,
    };

    await agent.post('/api/v1/admin/topics').send(body).set(headers);
    const response = await agent.post('/api/v1/admin/topics').send(body).set(headers);

    expect(response.status).toBe(409);
  });

  it('Should return 200 getting topics', async () => {
    const response = await agent.get('/api/v1/admin/topics').set(headers);
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(0);
  });

  it('Should return 200 editing a topic', async () => {
    const chapterId = await chapterSeed();
    const queryRes = await sequelize.query('INSERT INTO topics (name,"chapterId") VALUES ($1,$2) RETURNING id', { bind: ['dshusduh', chapterId] });
    const { id } = queryRes[0][0];
    const response = await agent.put(`/api/v1/admin/topics/${id}`).set(headers);
    expect(response.status).toBe(200);
  });

  it('Should return 404 editing a invalid topic', async () => {
    const response = await agent.put('/api/v1/admin/topics/2552').set(headers);
    expect(response.status).toBe(404);
  });

  it('Should return 200 getting a topic', async () => {
    const chapterId = await chapterSeed();
    const queryRes = await sequelize.query('INSERT INTO topics (name,"chapterId") VALUES ($1,$2) RETURNING id', { bind: ['dshusduh', chapterId] });
    const { id } = queryRes[0][0];
    const response = await agent.get(`/api/v1/admin/topics/${id}`).set(headers);
    expect(response.status).toBe(200);
  });

  it('Should return 404 getting a invalid topic', async () => {
    const response = await agent.get('/api/v1/admin/topics/2552').set(headers);
    expect(response.status).toBe(404);
  });

  it('Should return 200 deleting a topic', async () => {
    const chapterId = await chapterSeed();
    const queryRes = await sequelize.query('INSERT INTO topics (name,"chapterId") VALUES ($1,$2) RETURNING id', { bind: ['dshusduh', chapterId] });
    const { id } = queryRes[0][0];
    const response = await agent.delete(`/api/v1/admin/topics/${id}`).set(headers);
    expect(response.status).toBe(200);
  });
  it('Should return 404 deleting a invalid topic', async () => {
    const response = await agent.delete('/api/v1/admin/topics/32552').set(headers);
    expect(response.status).toBe(404);
  });
});
