const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 60,           
  message: { error: "Too many requests, please try again later." },
  standardHeaders: true, 
  legacyHeaders: false,  
  handler: (req, res, next, options) => {
    console.warn(`Rate limit exceeded for IP: ${req.ip}`);
    res.status(options.statusCode).json(options.message);
  },
});

module.exports = apiLimiter;
