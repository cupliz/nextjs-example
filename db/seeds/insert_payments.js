
const tableName = 'payments'
exports.seed = async function (knex) {
  await knex(tableName).del()
  await knex(tableName).insert([
    { id: 1, user: 'uSbULOoVEBMCPDFkf3WverxxONP2', total: 5 },
  ]);
};
