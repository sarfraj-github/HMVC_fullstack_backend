const sendResponse = (res, statusCode, message, data = null, error = null, errorCode = null) => {
  const response = {
    success: statusCode >= 200 && statusCode < 300,
    message,
    timestamp: new Date().toISOString()
  };

  if (data) response.data = data;
  if (error) response.error = error;
  if (errorCode) response.errorCode = errorCode;

  return res.status(statusCode).json(response);
};

const ResponseManager = {
  success: (res, message, data = null) => {
    return sendResponse(res, 200, message, data);
  },

  created: (res, message, data = null) => {
    return sendResponse(res, 201, message, data);
  },

  badRequest: (res, message, error = null, errorCode = null) => {
    return sendResponse(res, 400, message, null, error, errorCode);
  },

  unauthorized: (res, message = 'Unauthorized') => {
    return sendResponse(res, 401, message);
  },

  forbidden: (res, message = 'Forbidden') => {
    return sendResponse(res, 403, message);
  },

  notFound: (res, message = 'Resource not found') => {
    return sendResponse(res, 404, message);
  },

  validationError: (res, message, errors) => {
    return sendResponse(res, 422, message, null, { errors });
  },

  serverError: (res, message = 'Internal server error') => {
    return sendResponse(res, 500, message);
  },

  serviceUnavailable: (res, message = 'Service temporarily unavailable') => {
    return sendResponse(res, 503, message);
  },

  duplicate : (res, message = "Duplicate record") => {
    return sendResponse(res, 409, message);
  }
}

module.exports = ResponseManager

// exports.success = (res, data, status = 200) => {
//   res.status(status).json({ success: true, data });
// };

// exports.error = (res, message, status = 500) => {
//   res.status(status).json({ success: false, message });
// };

// exports.create = (res , message, data) => {
//   res.status(201).json({success: true , message , data});
// };
