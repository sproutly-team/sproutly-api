const healthCheckController = require('../controllers/HealthcheckController');

module.exports = api => {
  api.get('/health', healthCheckController.healthcheck);
};
