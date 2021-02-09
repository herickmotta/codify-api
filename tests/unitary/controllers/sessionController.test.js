/* eslint-disable no-undef */
const sessionController = require('../../../src/controllers/sessionController');
const NotFoundError = require('../../../src/errors/NotFoundError');

jest.mock('jsonwebtoken', () => ({
  sign: () => 'token_ultra_seguro',
}));

jest.mock('../../../src/models/Session');
const Session = require('../../../src/models/Session');

describe('sessionController.createSession', () => {
  it('Should return a session user if given data valid', async () => {
    const user = {
      id: 1,
      name: 'TestUser',
      email: 'EmailValid@email.com',
    };
    const { id, name, email } = user;
    const token = 'token_ultra_seguro';

    await Session.create.mockResolvedValue({ userId: id, token });

    const result = await sessionController.createSession(user);

    expect(result).toEqual(expect.objectContaining({
      id, name, email, token,
    }));
  });
});

describe('sessionController.findSessionByUserId', () => {
  it('Should return a session user if given  valid', async () => {
    const userId = 23;
    const sessionUser = {
      id: 1,
      userId,
      token: 'token_JWT',
    };

    await Session.findOne.mockResolvedValue(sessionUser);

    const result = await sessionController.findSessionByUserId(userId);

    expect(result).toEqual(expect.objectContaining(sessionUser));
  });

  it('Should return a NotFoundError given a userId invalid', async () => {
    const userIdInvalid = null;

    await Session.findOne.mockResolvedValue(null);

    const fn = async () => {
      await sessionController.findSessionByUserId(userIdInvalid);
    };

    expect(fn).rejects.toThrow(NotFoundError);
  });
});
