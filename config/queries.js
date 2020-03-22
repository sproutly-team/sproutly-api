const dotenv = require('dotenv')
dotenv.config()

const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
})

const getUsers = (request, response) => {
  console.log("it got in here")
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
      throw error
      }
      response.status(200).json(results.rows)
  })
}

  module.exports = {
    getUsers
  }