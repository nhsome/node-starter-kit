'use strict'

/**
 * Base class for command
 */
class Command {
  constructor(argv, { config, models, rabbitConnection, services }) {
    this.argv = argv
    this.config = config
    this.models = models
    this.rabbitConnection = rabbitConnection
    this.services = services
  }

  /**
   * Execute method must be implemented in children class
   */
  execute() {
    throw new Error('Execute method must be implemented')
  }
}

module.exports = Command
