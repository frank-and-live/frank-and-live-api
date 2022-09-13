const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { allowedDomains } = require('../config/config');

const whitelist = () => async (req, res, next) => {
  let requestHost = req.get('host');
  if (allowedDomains.includes(requestHost)) {
    return next();
  } else {
    return next(new ApiError(httpStatus.FORBIDDEN, `Domain not allowed: ${requestHost}`));
  }
};

module.exports = whitelist;
