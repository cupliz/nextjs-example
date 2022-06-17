import connectionHandler from '../../db/knex2';
const handler = async (req, res) => {
  try {
    const table = 'listings'
    if (req.method === 'GET') {
      if (Object.keys(req.query).length) {
        const result = await req.db(table).where(req.query).orderBy('created_at', 'desc')
        res.status(200).json(result)
      } else {
        res.status(200).json([])
      }
    }
    if (req.method === 'PATCH') {
      console.log(req.query, req.body)
      const result = await req.db(table).where(req.query).update(req.body).returning('id')
      res.status(200).json(result)
    }
    if (req.method === 'POST') {
      console.log(req.query, req.body)
      const result = await req.db(table).insert(req.body).returning('id')
      res.status(200).json(result)
    }
    if (req.method === 'DELETE') {
      const result = await req.db(table).where(req.query).delete()
      res.status(200).json(result)
    }
    return res.status(404).end();
  } catch (error) {
    return res.status(500).json(error);
  }
};
export default connectionHandler()(handler);