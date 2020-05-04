const winston = require('winston')

module.exports = function createLogger() {
  const format = winston.format

  return winston.createLogger({
    format: format.combine(
      format.errors({ stack: true }),
      format.metadata(),
      format.timestamp(),
      format.splat(),
      format.json(),
      format.prettyPrint()
    ),
    transports: [
      new winston.transports.Console()
    ],
    exceptionHandlers: [
      new winston.transports.Console()
    ],
    rejectionHandlers: [
      new winston.transports.Console()
    ],
    exitOnError: false
  })
}
