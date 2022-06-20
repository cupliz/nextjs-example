import S3 from "aws-sdk/clients/s3";
import connectionHandler from "../../db/knex";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const s3 = new S3({
      accessKeyId: process.env.ACCESS_KEY,
      secretAccessKey: process.env.SECRET_KEY,
    });
    const post = await s3.createPresignedPost({
      Bucket: process.env.BUCKET_NAME,
      Fields: {
        key: req.query.file,
        "Content-Type": req.query.fileType,
      },
      Expires: 60, // seconds
      Conditions: [
        ["content-length-range", 0, 1048576], // up to 1 MB
      ],
    });
    return res.status(200).json(post);
  }
  return res.status(404).end();
};
export default connectionHandler()(handler);
