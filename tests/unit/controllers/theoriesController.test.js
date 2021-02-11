/* eslint-disable no-undef */
const NotFoundError = require('../../../src/errors/NotFoundError');
const theoriesController = require('../../../src/controllers/theoriesController');

jest.mock('../../../src/models/Theory');
const Theory = require('../../../src/models/Theory');

describe('theoriesController.findTheoryById', () => {
  it('Should throw an error if given id invalid', async () => {
    const theoryNotFound = null;
    const invalidTheoryId = null;

    await Theory.findByPk.mockResolvedValue(theoryNotFound);

    const fn = async () => {
      await theoriesController.findTheoryById(invalidTheoryId);
    };

    expect(fn).rejects.toThrow(NotFoundError);
  });

  it('Should return a theory if given id valid', async () => {
    const theory = {
      id: 1,
      name: 'Theory Test',
    };
    const validTheoryId = 1;

    await Theory.findByPk.mockResolvedValue(theory);
    const result = await theoriesController.findTheoryById(validTheoryId);

    expect(result).toEqual(expect.objectContaining({ ...theory }));
  });
});

describe('theoriesController.getAllTheories', () => {
  it('Should return a empty array of theories when we dont have theories', async () => {
    const theories = [];

    await Theory.findByPk.mockResolvedValue(theories);
    const result = await theoriesController.getAllTheories();

    expect(result).toEqual(expect.objectContaining([]));
  });
});

describe('theoriesController.createTheory', () => {
  it('Should return a created theory', async () => {
    const theory = {
      id: 1,
      name: 'This is a name',
    };
    await Theory.findOne.mockResolvedValue(null);
    await Theory.create.mockResolvedValue(theory);

    const result = await theoriesController.createTheory(theory);

    expect(result).toEqual(expect.objectContaining(theory));
  });
});

describe('theoriesController.editTheory', () => {
  it('Should throw error if given invalid id', async () => {
    const theory = {
      id: 1,
      name: 'This is a name',
    };
    await Theory.findByPk.mockResolvedValue(null);

    const fn = async () => {
      await theoriesController.editTheory(theory);
    };

    expect(fn).rejects.toThrow(NotFoundError);
  });

  it('Should return a edited theory', async () => {
    const editedTheory = {
      id: 1,
      name: 'This is a edited name',
    };
    await Theory.findByPk.mockResolvedValue({
      id: 1,
      name: 'This is a name',
      save: async () => Promise.resolve(),
    });

    const result = await theoriesController.editTheory(editedTheory);

    expect(result).toEqual(expect.objectContaining({
      id: 1,
      name: 'This is a edited name',
    }));
  });
});
