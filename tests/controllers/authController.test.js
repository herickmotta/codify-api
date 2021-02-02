/* eslint-disable no-undef */
jest.mock('bcrypt', () => ({
  compareSync: () => 'true',
}));

jest.mock('../../src/models/Session');
const Session = require('../../src/models/Session');

describe('authController.create', () => {
  it('Should create one match and all pieces belongs to him', async () => {
    const match = {
      dataValues: {
        status: 'whitePlay',
        id: 500,
        secretKey: 'secretKeyHashed',
      },
    };

    const rawPieces = buildPieces(match.dataValues.id);
    const pieces = rawPieces.map((p, index) => {
      p.id = index;
      return p;
    });

    const equal = {
      ...match.dataValues,
      pieces,
    };

    await Match.create.mockResolvedValue({ ...match });
    await Piece.bulkCreate.mockResolvedValue([...pieces]);

    const result = await matchesController.create();

    expect(result).toEqual(equal);
  });
});
