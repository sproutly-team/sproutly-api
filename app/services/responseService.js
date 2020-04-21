
const errorResponse = (res, error, status, message) => {
  return res
  .status(status)
  .json({
    message: message,
    success: false,
    error: error.toString()
  });
}

const successResponse = (res, data, status, message="Response Completed") => {
  return res
  .status(status)
  .json({
    message: message,
    success: true,
    data
  });
}

module.exports = {
  errorResponse,
  successResponse
}