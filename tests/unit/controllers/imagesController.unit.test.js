/* eslint-disable no-undef */
const imagesController = require('../../../src/controllers/imagesController');

jest.mock('../../../src/utils/awsConfig');
const awsConfig = require('../../../src/utils/awsConfig');

jest.mock('../../../src/models/Image');
const Image = require('../../../src/models/Image');

jest.mock('uuid', () => ({
  v4: () => 'genarate_uuid',
}));

describe('imagesController.createImage', () => {
  it('Should return a imageUrl if given data valid', async () => {
    const userId = 1;
    const bucket = 'awsBucket';
    const key = 'keyImage';
    const file = {
      buffer: 'bufferMocked',
      mimetype: 'mimetypeMocked',
    };
    const imageUrl = 'ImageUrl';

    const spy = jest.spyOn(imagesController, 'deleteImageS3');
    spy.mockImplementation(() => {});

    await awsConfig.uploadToS3.mockResolvedValue(key, file.buffer, file.mimetype);

    await awsConfig.getSignedUrl.mockResolvedValue(imageUrl);

    await Image.create.mockResolvedValue({
      bucket, key, userId, imageUrl,
    });

    const result = await imagesController.createImage(file, userId);

    expect(result).toEqual(imageUrl);
  });
});
