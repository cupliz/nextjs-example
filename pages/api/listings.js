import connectionHandler from "../../db/knex";
const handler = async (req, res) => {
  try {
    const table = "listings";
    if (req.method === "GET") {
      if (Object.keys(req.query).length) {
        const result = await req
          .db(table)
          .where(req.query)
          .orderBy("created_at", "desc");
        return res.status(200).json(result);
      } else {
        return res.status(200).json([]);
      }
    }
    if (req.method === "PATCH") {
      const result = await req
        .db(table)
        .where(req.query)
        .update(req.body)
        .returning("id");
      return res.status(200).json(result);
    }
    if (req.method === "POST") {
      const result = await req.db(table).insert(req.body).returning("id");
      return res.status(200).json(result);
    }
    if (req.method === "DELETE") {
      const result = await req.db(table).where(req.query).delete();
      return res.status(200).json(result);
    }
    res.status(404).end();
  } catch (error) {
    handleApiError(res, error)
  }
};
export default connectionHandler()(handler);
