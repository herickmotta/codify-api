const { v4: uuidv4 } = require('uuid');
const Image = require('../models/Image');
const { uploadToS3, getSignedUrl, dentroyFromS3 } = require('../utils/awsConfig');

class ImagesController {
  async createImage(file, userId) {
    const id = uuidv4();
    const bucket = process.env.AWS_BUCKET_S3;
    const key = `images/${id}`;

    await this.deleteImageS3(userId);

    await uploadToS3(key, file.buffer, file.mimetype);

    const imageUrl = await getSignedUrl(bucket, key);

    return Image.create({
      bucket,
      key,
      userId,
      imageUrl,
    });
  }

  async deleteImageS3(userId) {
    const image = await Image.findOne({ where: { userId } });
    if (image) {
      const { key } = image;
      await dentroyFromS3(key);
      await image.destroy();
    }
  }

  getUserImage(userId) {
    return Image.findOne({ where: { userId } });
  }
}

module.exports = new ImagesController();
