const tableName = 'logos'
exports.up = async function (knex) {
  const exist = await knex.schema.hasTable(tableName)
  if (!exist) {
    return knex.schema.createTable(tableName, function (table) {
      table.string('key').primary().notNullable()
      table.string('url').notNullable()
      table.string('customer')
      table.datetime('created_at').notNullable().defaultTo(knex.fn.now())
      table.datetime('updated_at')
    })
  }
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists(tableName)
}

// Key [unique string that will be used when we track, should be lowercase, alphanumerical, allow underscores]
// Image url (File upload to S3 via Presigned URL)
// - Dimensions should be 300x300 or 300x150
// - Image should be transparent [png]
// Customer ID [only set if the logo was uploaded by a customer]
