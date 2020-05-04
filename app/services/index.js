'use strict'

const RabbitHelper = require('./RabbitHelper'),
  PasswordHash = require('./PasswordHash'),
  AuthJwt = require('./AuthJwt'),
  daoInit = require('./dao'),
  RequestsLogger = require('./RequestsLogger')

module.exports = function(config, models, rabbitConnection, logger) {
  const passwordHash = new PasswordHash(config.passwordsSaltRounds)

  return {
    dao: daoInit(models, passwordHash),
    rabbitHelper: new RabbitHelper(rabbitConnection),
    passwordHash,
    authJwt: new AuthJwt(config.jwt.secret, config.jwt.maxAge),
    requestsLogger: new RequestsLogger(models)
  }
}
