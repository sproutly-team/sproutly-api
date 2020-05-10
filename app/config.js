const compression = require('compression')
const bodyParser = require('body-parser')
const logger = require('morgan')
const errorHandler = require('errorhandler')
const lusca = require('lusca')
const expressStatusMonitor = require('express-status-monitor')

const models = require('./models/index')

module.exports = (app, express) => {
  app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0')
  app.set('port', process.env.PORT)

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  const api = require('./routes')(express)
  app.use('/api', api)

  app.use(expressStatusMonitor())
  app.use(compression())
  app.use(logger('dev'))

  app.use(lusca.xframe('SAMEORIGIN'))
  app.use(lusca.xssProtection(true))
  app.disable('x-powered-by')

  if (process.env.NODE_ENV === 'development') {
    // only use in development
    app.use(errorHandler())
  }

  app.listen(app.get('port'), async () => {
    await models.sequelize.sync()
    console.log(
      'App is running at port %s in %s mode',
      app.get('port'),
      app.get('env')
    )
  })
}
