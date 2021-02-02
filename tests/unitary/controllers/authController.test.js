/* eslint-disable no-undef */
const authenticationController = require('../../../src/controllers/authenticationController');
const UnauthorizedError = require('../../../src/errors/UnauthorizedError');

jest.mock('bcrypt', () => ({
  compareSync: (plainPassword) => plainPassword === 'correct_password',
}));

jest.mock('../../../src/models/User');
const User = require('../../../src/models/User');

describe('authenticationController.verifyUserEmailAndPassword', () => {
  it('Should throw an error if given email invalid', async () => {
    const userNotFound = null;

    await User.findOne.mockResolvedValue(userNotFound);

    const fn = async () => {
      await authenticationController.verifyUserEmailAndPassword({
        email: 'emailNotRegistred@test.com.br',
        password: 'correct_password',
      });
    };

    expect(fn).rejects.toThrow(UnauthorizedError);
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

    const fn = async () => {
      await authenticationController.verifyUserEmailAndPassword({
        email: 'registredEmail@valid.com.br',
        password: currentPassword,
      });
    };

    expect(fn).rejects.toThrow(UnauthorizedError);
  });

  it('Should retunr the user with password valid', async () => {
    const plainPassword = 'correct_password';
    const user = {
      id: 1,
      name: 'userNameTest',
      email: 'registredEmail@valid.com.br',
      password: 'hased_password',
    };
    const { id, name, email } = user;

    await User.findOne.mockResolvedValue(user);

    const result = await authenticationController.verifyUserEmailAndPassword({
      email: 'registredEmail@valid.com.br',
      password: plainPassword,
    });

    expect(result).toEqual(expect.objectContaining({ id, name, email }));
  });
});
