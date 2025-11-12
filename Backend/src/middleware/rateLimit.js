const rateLimit = require("express-rate-limit");

const createUrlLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: "Too many requests — please try again later",
});

module.exports = createUrlLimiter;
