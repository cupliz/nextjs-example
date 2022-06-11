require('dotenv').config()
const db = require('./db/knex')
module.exports = {
  development: db.config,
  staging: db.config,
  production: db.config
}
