const dotenv = require('dotenv');

dotenv.config({ path: '.env' });

module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 4000,
  secretKey: process.env.SECRET_KEY,
  jwt: {
    secret: process.env.JWT_SECRET,
    expiration: 86400
  },
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
    dialect: 'postgres',
    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASSWORD
    }
  },
  staging: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'sproutly',
    dialect: 'postgres',
    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASSWORD
    }
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres'
  }
};
