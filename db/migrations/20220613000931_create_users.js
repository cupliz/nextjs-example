const tableName = 'users'
exports.up = async function (knex) {
  const exist = await knex.schema.hasTable(tableName)
  if (!exist) {
    return knex.schema.createTable(tableName, function (table) {
      table.string('uid').primary().notNullable()
      table.string('fullname').notNullable()
      table.string('email').notNullable()
      table.string('phone').notNullable()
      table.string('stripe')
      table.boolean('subscribe').notNullable().defaultTo(false)
      table.datetime('created_at').notNullable().defaultTo(knex.fn.now())
      table.datetime('updated_at')
    })
  }
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists(tableName)
}