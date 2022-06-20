const tableName = 'listings'
exports.up = async function (knex) {
  const exist = await knex.schema.hasTable(tableName)
  if (!exist) {
    return knex.schema.createTable(tableName, function (table) {
      table.increments('id').primary().notNullable()
      table.string('user').notNullable()
      table.string('name')
      table.string('desc')
      table.string('background')
      table.string('title')
      table.string('theme').notNullable().defaultTo('dark')
      table.text('links')
      table.string('image')
      table.string('fb')
      table.string('ga')
      table.datetime('created_at').notNullable().defaultTo(knex.fn.now())
      table.datetime('updated_at')
    })
  }
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists(tableName)
}