/* eslint-disable no-undef */
const usersController = require('../../../src/controllers/usersController');

jest.mock('../../../src/models/User');
jest.mock('sequelize');

jest.mock('bcrypt', () => ({
  hashSync: (password) => password,
}));

const User = require('../../../src/models/User');

describe('signUpUser', () => {
  it('returns complete user when passed correct data', async () => {
    const newUser = {
      name: 'Fulano',
      email: 'fulano@fulano.com',
      password: '1111111111111111',
    };
    const expected = newUser;

    User.create.mockResolvedValue(newUser);

    const result = await usersController.create(newUser);
    expect(result).toBe(expected);
  });
});
