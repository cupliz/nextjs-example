// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from '../../db/knex'
export default async function handler(req, res) {
  try {
    const listings = await db('listings').where(req.query)
    // db.destroy()
    res.status(200).json(listings)
  } catch (error) {
    res.status(500).json(error)
  }
}
