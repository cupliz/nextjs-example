const AWS = require('aws-sdk');
const sharp = require('sharp');
const fs = require('fs');
const fsPromises = fs.promises;

require('dotenv').config({ path: '.env.development' });

const imgDir = './tmp/logos/';
const imgOutDir = './tmp/logos-upload/';

const exec = async () => {
  const files = await fsPromises.readdir(imgDir);

  for (let file of files) {
    if (/\.png/.test(file)) {
      if (/.+-square\.png$/.test(file)) {
        await sharp(`${imgDir}${file}`)
          .resize(300, 300, { fit: 'contain', background: {r:0,g:0,b:0,alpha:0} })
          .toFile(`${imgOutDir}${file}`);
      } else {
        await sharp(`${imgDir}${file}`)
          .resize(300, 150, { fit: 'contain', background: {r:0,g:0,b:0,alpha:0} })
          .toFile(`${imgOutDir}${file}`);
      }
      await fsPromises.chmod(`${imgOutDir}${file}`, 0755);
    }
  }

  /* Upload to bucket */
  const s3 = new AWS.S3({
      accessKeyId: process.env.STORAGE_ACCESS_KEY,
      secretAccessKey: process.env.STORAGE_SECRET_KEY,
      endpoint: process.env.STORAGE_ENDPOINT,
  });

  console.log(process.env.STORAGE_BUCKET_NAME);

  const uploadFile = ({ src, destination }) => {
      // Read content from the file
      const fileContent = fs.readFileSync(src);

      // Setting up S3 upload parameters
      const params = {
          Bucket: process.env.STORAGE_BUCKET_NAME,
          Key: destination, // File name you want to save as in S3
          Body: fileContent
      };

      // Uploading files to the bucket
      s3.upload(params, function(err, data) {
          if (err) {
              throw err;
          }
          console.log(`File uploaded successfully. ${process.env.CDN_URL}/${destination}`);
      });
  };

  const outFiles = await fsPromises.readdir(imgOutDir);
  for (let file of outFiles) {
    if (/\.png/.test(file)) {
      console.log('upload', file);
      await s3.deleteObject({
        Bucket: process.env.STORAGE_BUCKET_NAME,
        Key: `logos/${file}`,
      });

      uploadFile({ src: `${imgOutDir}/${file}`, destination: `logos/${file}` });
    }
  }
};

exec();
