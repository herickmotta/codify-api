const { v4: uuidv4 } = require('uuid');
const Image = require('../models/Image');
const { uploadToS3, getSignedUrl, destroyFromS3 } = require('../utils/awsConfig');

class ImagesController {
  async createImage(file, userId) {
    const { buffer, mimetype } = file;
    const id = uuidv4();
    const bucket = process.env.AWS_BUCKET_S3;
    const key = `images/${id}`;

    await this.deleteImageS3(userId);

    await uploadToS3(key, buffer, mimetype);

    const imageUrl = await getSignedUrl(bucket, key);

    await Image.create({
      bucket,
      key,
      userId,
      imageUrl,
    });
    return imageUrl;
  }

  async deleteImageS3(userId) {
    const image = await Image.findOne({ where: { userId } });
    if (image) {
      const { key } = image;
      await destroyFromS3(key);
      await image.destroy();
    }
  }

  getUserImage(userId) {
    return Image.findOne({ where: { userId } });
  }
}

module.exports = new ImagesController();
