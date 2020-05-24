const dotenv = require('dotenv')

dotenv.config({ path: '.env' })

const dbCred = JSON.parse(process.env.DB)

console.log(dbCred, 'dbcreddiii')

module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 4000,
  secretKey: process.env.SECRET_KEY,
  test: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    database: 'sproutly_test',
    dialect: 'postgres'
  },
  development: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    database: 'sproutly',
    dialect: 'postgres'
  },
  staging: {
    host: dbCred.host,
    port: dbCred.port,
    username: dbCred.username,
    password: dbCred.password,
    database: 'sproutly',
    dialect: 'postgres'
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres'
  }
}
