const winston = require('winston')
const { Loggly } = require('winston-loggly-bulk')
const Util = require('./UtilService')

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'sproutly-service' }
})

// // A console transport logging debug and above.
logger.add(
  new winston.transports.Console({
    format: winston.format.simple()
  })
)

if (!Util.isDev()) {
  const token = process.env.LOGGLY_TOKEN
  const subdomain = process.env.LOGGLY_SUBDOMAIN
  // A Loggly transports for info and above
  logger.add(
    new Loggly({
      level: 'info',
      token,
      subdomain,
      tags: ['api', process.env.NODE_ENV],
      json: true
    })
  )
}

module.exports = logger
