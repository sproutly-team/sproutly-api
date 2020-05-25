const _ = require('lodash');
const BaseError = require('../errors/BaseError');

const defaultCode = 'something_went_wrong';
const defaultMessage = 'Something went wrong';

function parse(error) {
  const isCustom = error instanceof BaseError;
  const resObj = {
    status: 400,
    code: defaultCode,
    message: defaultMessage
  };

  if (isCustom) {
    resObj.code = _.get(error, 'code', defaultCode);
    resObj.message = _.get(error, 'message', defaultMessage);
    resObj.status = _.get(error, 'status');
    return resObj;
  }

  if (error.name === 'StatusCodeError') {
    resObj.message = error.message;
    resObj.code = defaultCode;
    return resObj;
  }

  if (error.name === 'RequestError') {
    resObj.message = 'External Server Is Down';
    resObj.code = defaultCode;
    resObj.status = 500;
    return resObj;
  }

  if (error.cause && error.cause.code === 'ECONNREFUSED') {
    resObj.message = 'External Server Is Down';
    resObj.code = defaultCode;
    resObj.status = 500;
    return resObj;
  }

  return resObj;
}

/**
 * ResponseService.js
 */
const service = {
  json(res, statusOrError, message, data, meta, code) {
    const error = statusOrError instanceof Error ? statusOrError : null;

    const responseObj = {};
    responseObj.message = message;

    let status = statusOrError;

    if (error) {
      const errorObj = parse(error);
      responseObj.code = errorObj.code;
      responseObj.message = errorObj.message;
      status = _.get(errorObj, 'status', status);
    }

    if (!_.isEmpty(data)) {
      responseObj.data = data;
    }
    if (!_.isEmpty(meta)) {
      responseObj.meta = meta;
    }
    if (!_.isEmpty(code)) {
      responseObj.code = code;
    }

    res.status(status).json(responseObj);
  },

  sendError(error, res) {
    const response = {
      message: error.message
    };
    const status = error.status || 400;
    res.status(status).json(response);
  }
};

module.exports = service;
