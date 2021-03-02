/* eslint-disable no-undef */
const imagesController = require('../../../src/controllers/imagesController');

jest.mock('jsonwebtoken', () => ({
  sign: () => 'token_ultra_seguro',
}));

describe('imagesController.createImage', () => {
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
