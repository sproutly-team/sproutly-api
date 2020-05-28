const ResponseService = require('../services/ResponseService');

const controller = {
  healthcheck(req, res) {
    return ResponseService.json(res, 200, 'up');
  }
};

module.exports = controller;
