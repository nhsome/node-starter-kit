'use strict'

class Worker {
  constructor({ config, models, rabbitConnection, services, logger }) {
    this.models = models
    this.config = config
    this.rabbitConnection = rabbitConnection
    this.services = services
    this.logger = logger
  }

  /**
   * @param {Object} message
   * @param {Boolean} fromJson
   * @returns {String|Object}
   */
  static parseMessage(message, fromJson = true) {
    message = message.content.toString()
    if (!fromJson) return message
    return JSON.parse(message)
  }

  /**
   * @param {String} qname
   * @param {Number} prefetch
   * @returns {Promise<void>}
   */
  async listen(qname, prefetch = 1) {
    this.qname = qname
    const channel = await this.rabbitConnection.createChannel()
    const assertResult = await channel.assertQueue(qname, { durable: true })
    await channel.prefetch(prefetch)
    await channel.consume(qname, async (message) => {
      if (message !== null) {
        const startTime = Date.now()
        this.logger.info(`Received job for queue ${ qname }.`)
        await this.execute(channel, message)
        const timeForExecuting = (Date.now() - startTime) / 1000
        this.logger.info(`End job for queue ${ qname }. Time for executing: ${ timeForExecuting }s`)
      } else {
        this.logger.warn('Received empty message', assertResult)
      }
    }, { noAck: false })
  }

  // execute method must be implemented
  execute(channel, message) {
    throw new Error(`Execute method must be implement for queue ${ this.qname }`)
  }
}

module.exports = Worker