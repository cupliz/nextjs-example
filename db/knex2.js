const dbConfig = require("../knexfile");
const knex = require("knex");

let connection;

export const getDatabaseConnector = () => {
  return () => {
    const configByEnvironment = dbConfig[process.env.NODE_ENV || "development"];
    if (!configByEnvironment) {
      throw new Error(
        `Failed to get knex configuration for env:${process.env.NODE_ENV}`
      );
    }
    connection = knex(configByEnvironment);
    return connection;
  };
};

const connector = getDatabaseConnector();
export default (...args) => {
  return (fn) => async (req, res) => {
    req.db = connector();
    await fn(req, res);
    await req.db.destroy();
    return;
  };
};