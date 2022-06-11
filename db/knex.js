const config = {
  client: 'pg',
  connection: process.env.DB_CONNECTION,
  migrations: {
    tableName: 'knex_migrations',
    directory: './db/migrations'
  },
  seeds: {
    directory: './db/seeds'
  },
  searchPath: ['knex', 'public'],
}
const conn = require('knex')(config)

module.exports = {
  conn,
  config
}