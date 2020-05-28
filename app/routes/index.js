const authRoutes = require('./auth');
const healthcheckRoutes = require('./healthcheck');

module.exports = express => {
  const api = express.Router();

  authRoutes(api);
  healthcheckRoutes(api);

  return api;
};
