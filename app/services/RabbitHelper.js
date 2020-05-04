'use strict'

class RabbitHelper {
  constructor(rabbitConnection) {
    this.rabbitConnection = rabbitConnection
  }

  /**
   * @param {String} qname
   * @returns {Promise<Channel>}
   */
  async getAssertedChannel(qname) {
    const channel = await this.rabbitConnection.createConfirmChannel()
    await channel.assertQueue(qname, { durable: true })
    return channel
  }

  /**
   * @param {Channel} channel
   * @param {String} qname
   * @param {Object} data
   */
  sendObjectToQueue(channel, qname, data) {
    channel.sendToQueue(qname, Buffer.from(JSON.stringify(data)), { persistent: true })
  }

  /**
   * @param {String} qname
   * @param {Array<Object>} arrData
   * @returns {Promise<void>}
   */
  async bulkSendObjectsToQueue(qname, arrData) {
    const channel = await this.getAssertedChannel(qname)
    arrData.forEach(data => this.sendObjectToQueue(channel, qname, data))
    await channel.waitForConfirms()
    await channel.close()
  }
}

module.exports = RabbitHelper
