require('dotenv').config()
const config = {
  client: 'pg',
  connection: process.env.DB_CONNECTION,
  pool: {
    min: 0,
    max: 10,
    idleTimeoutMillis: 500,
    reapIntervalMillis: 500,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './db/migrations'
  },
  seeds: {
    directory: './db/seeds'
  },
  searchPath: ['knex', 'public'],
}
module.exports = {
  development: config,
  staging: config,
  production: config
}
