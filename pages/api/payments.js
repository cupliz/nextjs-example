// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from '../../db/knex'
export default async function handler(req, res) {
  const table = 'payments'
  try {
    if (req.method === 'GET') {
      const result = await db(table).where(req.query)
      res.status(200).json(result)
    }
    if (req.method === 'POST') {
      const created = await db(table).insert(req.body, 'id')
      const result = await db(table).where(created[0])
      // await db.destroy()
      res.status(200).json(result)
    }
  } catch (error) {
    res.status(500).json(error)
  }
}
