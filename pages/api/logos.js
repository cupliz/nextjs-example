import connectionHandler from "../../db/knex";
import { handleApiError } from '../../utils/helper'

const handler = async (req, res) => {
  try {
    const table = "logos";
    if (req.method === "GET") {
      const data = await req.db(table);
      return res.status(200).json(data);
    }
    if (req.method === "POST") {
      const result = await req.db(table).insert(req.body).returning("key");
      return res.status(200).json(result);
    }
    if (req.method === "DELETE") {
      const result = await req.db(table).where(req.query).delete();
      return res.status(200).json(result);
    }
    return res.status(404).end();
  } catch (error) {
    handleApiError(res, error)
  }
};
export default connectionHandler()(handler);
