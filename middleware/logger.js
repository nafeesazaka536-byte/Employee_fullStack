const morgan = require('morgan');

// Using morgan for request logging
const requestLogger = morgan('dev');

module.exports = { requestLogger };
