/* eslint-disable no-undef */
const sessionController = require('../../../src/controllers/sessionController');

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'token_Bunitao'),
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
    const token = 'token_Bunitao';

    await Session.create.mockResolvedValue({ userId: id, token });

    const result = await sessionController.createSession(user);

    expect(result).toEqual(expect.objectContaining({
      id, name, email, token,
    }));
  });
});
