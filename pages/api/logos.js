// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from '../../db/knex'
export default async function handler(req, res) {
  try {
    const result = await db('logos')
    // db.destroy()
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json(error)
  }
}
