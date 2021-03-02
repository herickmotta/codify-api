const { v4: uuidv4 } = require('uuid');
const Image = require('../models/Image');
const { uploadToS3, getSignedUrl } = require('../utils/awsConfig');

class ImagesController {
  async createImage(file, userId) {
    const id = uuidv4();
    const bucket = process.env.AWS_BUCKET_S3;
    const key = `images/${id}`;

    await uploadToS3(key, file.buffer, file.mimetype);

    await Image.create({
      id,
      bucket,
      key,
      userId,
      imageURL: getSignedUrl(bucket, key),
    });
  }
}

module.exports = new ImagesController();
