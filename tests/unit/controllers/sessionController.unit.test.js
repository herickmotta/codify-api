/* eslint-disable no-undef */
const sessionController = require('../../../src/controllers/sessionController');
const NotFoundError = require('../../../src/errors/NotFoundError');
const UnauthorizedError = require('../../../src/errors/UnauthorizedError');
const client = require('../../../src/utils/redis');

jest.mock('jsonwebtoken', () => ({
  sign: () => 'token_ultra_seguro',
}));

describe('sessionController.createSession', () => {
  it('Should return a session user if given data valid', async () => {
    const user = {
      id: 1,
      name: 'TestUser',
      email: 'EmailValid@email.com',
    };
    const { id, name, email } = user;
    const token = 'token_ultra_seguro';

    const spy = jest.spyOn(client, 'setex');
    spy.mockImplementation(() => {});

    const result = await sessionController.createSession(user);

    expect(result).toEqual(expect.objectContaining({
      id, name, email, token,
    }));
  });
});

describe('sessionController.findSessionByUserId', () => {
  it('Should return a session user if given  valid', async () => {
    const userId = 23;
    const token = 'JTW_token';

    const spy = jest.spyOn(client, 'get');
    spy.mockImplementation(() => token);

    const result = await sessionController.findSessionByUserId(userId);

    expect(result).toEqual(token);
  });

  it('Should return a NotFoundError given a userId invalid', async () => {
    const userIdInvalid = null;
    const spy = jest.spyOn(client, 'get');
    spy.mockImplementation(() => null);
    const fn = async () => {
      await sessionController.findSessionByUserId(userIdInvalid);
    };

    expect(fn).rejects.toThrow(NotFoundError);
  });
});

describe('sessionController.verifySessionToRedefinePassword', () => {
  it('Should call client.get with id-recover-password', async () => {
    const id = 1;
    const tokenToVerify = '1234567890';
    const token = '1234567890';

    const spy = jest.spyOn(client, 'get');
    spy.mockImplementation(() => token);

    await sessionController.verifySessionToRedefinePassword(id, tokenToVerify);

    expect(client.get).toHaveBeenCalled();
    expect(client.get).toHaveBeenCalledWith(`${id}-recover-password`);
  });

  it('Should return UnauthorizedError when tokenToVerify is not equal token', async () => {
    const id = 1;
    const tokenToVerify = '1234567890';
    const token = '1111111111';

    const spy = jest.spyOn(client, 'get');
    spy.mockImplementation(() => token);

    const fn = async () => {
      await sessionController.verifySessionToRedefinePassword(id, tokenToVerify);
    };

    expect(fn).rejects.toThrow(UnauthorizedError);
  });
});

describe('sessionController.createRecoverPasswordSession', () => {
  it('Should call client.get with id-recover-password and token', async () => {
    const id = 1;
    const token = '1234567890';

    const spy = jest.spyOn(client, 'setex');
    spy.mockImplementation(() => token);

    await sessionController.createRecoverPasswordSession(id, token);

    expect(client.setex).toHaveBeenCalled();
    expect(client.setex).toHaveBeenCalledWith(`${id}-recover-password`, 600, token);
  });
});
