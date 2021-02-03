/* eslint-disable no-undef */
require('dotenv').config();

const { Pool } = require('pg');
const supertest = require('supertest');
const sequelize = require('../../src/utils/database');

const app = require('../../src/app');

const agent = supertest(app);
const db = new Pool({
  connectionString: process.env.DATABASE_URL,
});

beforeEach(async () => {
  await db.query('DELETE FROM users;');
});

afterAll(async () => {
  await db.end();
  await sequelize.close();
});

describe('POST /api/users/signup', () => {
  it('Should return 422 if there is no email param', async () => {
    const body = {
      name: 'João',
      password: '12345678',
      passwordConfirmation: '12345678',
    };

    const response = await agent.post('/api/users/signup').send(body);

    expect(response.status).toBe(422);
  });

  it('Should return 422 if password confirmation is not correct', async () => {
    const body = {
      name: 'João',
      email: 'joao@joao.com',
      password: '12345678',
      passwordConfirmation: '123456789',
    };

    const response = await agent.post('/api/users/signup').send(body);

    expect(response.status).toBe(422);
  });

  it('Should return 422 if password length is less than 8 characters', async () => {
    const body = {
      name: 'João',
      email: 'joao@joao.com',
      password: '1234567',
      passwordConfirmation: '1234567',
    };

    const response = await agent.post('/api/users/signup').send(body);

    expect(response.status).toBe(422);
  });

  it('Should return 409 if the email is already registered', async () => {
    const body = {
      name: 'João',
      email: 'joao@joao.com',
      password: '12345678',
      passwordConfirmation: '12345678',
    };

    await agent.post('/api/users/signup').send(body);
    const response = await agent.post('/api/users/signup').send(body);

    expect(response.status).toBe(409);
  });

  it('Should return 201 if input data is correct', async () => {
    const body = {
      name: 'João',
      email: 'joao@joao.com',
      password: '12345678',
      passwordConfirmation: '12345678',
    };

    const response = await agent.post('/api/users/signup').send(body);

    expect(response.status).toBe(201);
  });
});
