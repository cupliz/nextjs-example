const tableName = 'listings'
exports.up = async function (knex) {
  const exist = await knex.schema.hasTable(tableName)
  if (!exist) {
    return knex.schema.createTable(tableName, function (table) {
      table.increments('id').primary().notNullable()
      table.string('customer').notNullable()
      table.string('background')
      table.string('name')
      table.string('title')
      table.string('description')
      table.string('theme')
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



// Listing belongs to a single Customer
// Theme field, which will be a preset array of available templates essentially [just do ‘dark’ and ‘light’ right now]
// Has an Identifier (Numerical ID)
// Has a Background Image URL (File Upload to S3 via Presigned URL)
// - Maximum file size of say 800kb
// - Requires a large dimension, the image will be a full-screen
// “Title” field that will be used for customized heading text on lander
// “Links” field that should be an array of objects, the logo should point to the logo models
// [ { logo: 'airbnb', url: 'https://www.airbnb.com/rooms/51228159' }, { logo: 'vrbo', url: 'https://www.vrbo.com/2459328' }, ]
// Page Title [string used for seo / open graph]
// Page Description [string used for seo / open graph]
// Page Preview Image URL [File Upload to S3 via Presigned URL]
// - Max file size of 500kb
// - 1200x630px (maximum size but require the same ratio)
// Facebook Pixel [string value for the facebook pixel id]
// Google Analytics ID [string value for GA]
