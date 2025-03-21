const winston = require('winston');

const logger = winston.createLogger({
  level: 'error',
  transports: [
    new winston.transports.Console()
    
  ]
});

const errorHandler = (err, req, res, next) => {
  logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method}`);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
};

module.exports = errorHandler;

