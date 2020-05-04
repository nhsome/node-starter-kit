'use strict'

const models = require('../models'),
  Services = require('../services'),
  config = require('./config.js'),
  amqplib = require('amqplib'),
  createLogger = require('./createLogger')

module.exports = async function() {
  await models.sequelize.authenticate()

  const rabbitConnection = await amqplib.connect(config.rabbit.connectionString)
  process.once('SIGINT', async () => {
    await rabbitConnection.close()
  })

  const logger = createLogger()

  const services = Services(config, models, rabbitConnection, logger)

  return { config, models, rabbitConnection, services, logger }
}
