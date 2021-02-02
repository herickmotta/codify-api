/* eslint-disable no-undef */
const authenticationController = require('../../src/controllers/authenticationController');
const NotFoundError = require('../../src/errors/NotFoundError');

jest.mock('bcrypt', () => ({
  compareSync: (curretPassword) => curretPassword === 'correct_Password',
}));

jest.mock('../../src/models/Session');
const Session = require('../../src/models/Session');

jest.mock('../../src/models/User');
const User = require('../../src/models/User');

describe('authenticationController.verifyUser', () => {
  it('Should throw an error if given email invalid', async () => {
    const userNotFound = null;

    await User.findOne.mockResolvedValue(userNotFound);

    const result = await authenticationController.verifyUser({
      email: 'emailNotRegistred@test.com.br',
      password: 'correct_Password',
    });

    expect(result).toThrow(NotFoundError);
  });

  it('Should throw an error if given password invalid', async () => {
    const currentPassword = 'wrong_password';
    const user = {
      id: 1,
      name: 'userNameTest',
      email: 'registredEmail@valid.com.br',
      password: 'hashed_password',
    };

    await User.findOne.mockResolvedValue(user);

    const result = await authenticationController.verifyUser({
      email: 'registredEmail@valid.com.br',
      password: currentPassword,
    });

    expect(result).toThrow(NotFoundError);
  });
});
