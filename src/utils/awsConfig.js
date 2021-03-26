const aws = require('aws-sdk');

const s3 = new aws.S3({
  signatureVersion: 'v4',
  region: process.env.AWS_REGION,
});

const S3_BUCKET = process.env.AWS_BUCKET_S3;

async function uploadToS3(key, buffer, mimetype) {
  return new Promise((resolve) => {
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

async function destroyFromS3(key) {
  return new Promise((resolve) => {
    s3.deleteObject(
      {
        Bucket: S3_BUCKET,
        Key: key,
      },
      () => resolve(),
    );
  });
}

function getSignedUrl(bucket, key) {
  return new Promise((resolve) => {
    s3.getSignedUrl(
      'getObject',
      {
        Bucket: bucket,
        Key: key,
      },
      (err, url) => {
        if (err) throw new Error(err);

        resolve(url);
      },
    );
  });
}

module.exports = { uploadToS3, getSignedUrl, destroyFromS3 };
