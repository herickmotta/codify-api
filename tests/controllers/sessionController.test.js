/* eslint-disable no-undef */
const authenticationController = require('../../src/controllers/authenticationController');
const NotFoundError = require('../../src/errors/NotFoundError');

jest.mock('bcrypt', () => ({
  compareSync: (curretPassword) => curretPassword === 'correct_Password',
}));

jest.mock('../../src/models/Session');
const Session = require('../../src/models/Session');

describe('sessionController.createSession', () => {
  it('Should throw an error if given email invalid', async () => {
    const userNotFound = null;

    await User.findOne.mockResolvedValue(userNotFound);

    const result = await authenticationController.verifyUser({
      email: 'emailNotRegistred@test.com.br',
      password: 'correct_Password',
    });

    expect(result).toThrow(NotFoundError);
  });
});
