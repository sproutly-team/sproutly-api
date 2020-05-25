const AuthRoutes = require('./auth')

module.exports = (express) => {
  const api = express.Router()

  AuthRoutes(api)

  return api
}
