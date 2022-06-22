import aws from 'aws-sdk'
import { handleApiError, nanoid } from '../../utils/helper'
// import connectionHandler from "../../db/knex";

const Bucket = process.env.S3_BUCKET_NAME
const Endpoint = process.env.S3_ENDPOINT
const s3 = new aws.S3({
  apiVersion: '2006-03-01',
  endpoint: new aws.Endpoint(Endpoint),
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY
})


const handler = async (req, res) => {
  // const ctx = { req, res }
  try {
    if (req.method === "GET") {
      if (req.query.prefix) params['Prefix'] = req.query.prefix
      if (req.query.limit) params['MaxKeys'] = req.query.limit
      if (req.query.encoding) params['EncodingType'] = req.query.encoding
      const { Contents } = await s3.listObjects({ Bucket }).promise()
      return res.json(Contents)
    }
    if (req.method === "POST") {
      const [extension] = req.query.fileName.match(
        /\.([0-9a-z]+)(?:[\?#]|$)/i
      )
      const post = s3.createPresignedPost({
        Bucket,
        Fields: {
          key: `background/${nanoid(28) + extension}`,
          'Content-Type': req.query.fileType,
        },
        Expires: 60, // seconds
        Conditions: [
          ['content-length-range', 0, 1048576], // up to 1 MB
        ],
      })
      return res.json(post)
    }
    if (req.method === "DELETE") {
      const params = {
        Bucket,
        Key: req.query.name
      }
      await s3.deleteObject(params).promise()
      res.json(params)
    }
    res.status(404).end();
  } catch (error) {
    handleApiError(res, error)
  }
}
export default handler