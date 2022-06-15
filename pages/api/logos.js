import connectionHandler from '../../db/knex2';
const handler = async (req, res) => {
  try {
    if (req.method === 'GET') {
      const data = await req.db('logos')
      return res.status(200).json(data)
    }

    return res.status(404).end();
  } catch (error) {
    return res.status(500).json(error);
  }
};
export default connectionHandler()(handler);