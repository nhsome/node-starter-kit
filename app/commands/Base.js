'use strict'

class Command {
  constructor(argv, { config, models, rabbitConnection, services }) {
    this.argv = argv
    this.config = config
    this.models = models
    this.rabbitConnection = rabbitConnection
    this.services = services
  }

  //execute method must be implemented
  execute() {
    throw new Error('Execute method must be implemented')
  }
}

module.exports = Command
