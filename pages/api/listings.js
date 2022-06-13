// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from '../../db/knex'
export default async function handler(req, res) {
  try {
    console.log(req.query)
    if (Object.keys(req.query).length) {
      const result = await db('listings').where(req.query)
      res.status(200).json(result)
    } else {
      res.status(200).json([])
    }
  } catch (error) {
    res.status(500).json(error)
  }
}
