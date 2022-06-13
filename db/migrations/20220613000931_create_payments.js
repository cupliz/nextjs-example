const tableName = 'payments'
exports.up = async function (knex) {
  const exist = await knex.schema.hasTable(tableName)
  if (!exist) {
    return knex.schema.createTable(tableName, function (table) {
      table.increments('id').primary().notNullable()
      table.string('user').notNullable()
      table.string('stripe')
      table.float('total')
      table.datetime('created_at').notNullable().defaultTo(knex.fn.now())
    })
  }
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists(tableName)
}