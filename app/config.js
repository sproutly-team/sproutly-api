const compression = require('compression');
const bodyParser = require('body-parser');
const logger = require('morgan');
const errorHandler = require('errorhandler');
const lusca = require('lusca');
const passport = require('passport');
const expressStatusMonitor = require('express-status-monitor');
const Logger = require('./services/LogService');
const PassportService = require('./services/PassportService');

const models = require('./models/index');
const routes = require('./routes');

module.exports = (app, express) => {
  app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
  app.set('port', process.env.PORT);

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  const api = routes(express);
  app.use('/api', api);

  app.use(expressStatusMonitor());
  app.use(compression());
  app.use(logger('dev'));

  app.use(lusca.xframe('SAMEORIGIN'));
  app.use(lusca.xssProtection(true));
  app.disable('x-powered-by');
  app.use(passport.initialize());
  PassportService();

  if (process.env.NODE_ENV === 'development') {
    // only use in development
    app.use(errorHandler());
  }

  app.listen(app.get('port'), async () => {
    await models.sequelize.sync();
    Logger.info('Sproutly API running');
    // eslint-disable-next-line no-console
    console.log(
      'App is running at port %s in %s mode',
      app.get('port'),
      app.get('env')
    );
  });
};
