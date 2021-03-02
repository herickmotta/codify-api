const aws = require('aws-sdk');

const s3 = new aws.S3({
  signatureVersion: 'v4',
  region: process.env.AWS_REGION,
});

const S3_BUCKET = process.env.AWS_BUCKET_S3;

async function uploadToS3(key, buffer, mimetype) {
  return new Promise((resolve, reject) => {
    s3.putObject(
      {
        Bucket: S3_BUCKET,
        ContentType: mimetype,
        Key: key,
        Body: buffer,
      },
      () => resolve(),
    );
  });
}

function getSignedUrl(bucket, key, expires = 3600) {
  return new Promise((resolve, reject) => {
    s3.getSignedUrl(
      'getObject',
      {
        Bucket: bucket,
        Key: key,
        Expires: expires,
      },
      (err, url) => {
        if (err) throw new Error(err);

        resolve(url);
      },
    );
  });
}

module.exports = { uploadToS3, getSignedUrl };
