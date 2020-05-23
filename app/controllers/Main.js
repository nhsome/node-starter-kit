'use strict'

const Controller = require('./Base')

/**
 * Provides main methods for API
 */
class Main extends Controller {
  ping() {
    return 'pong'
  }

  showThisUser(req) {
    return this.models.User.findByPk(req.user.id, {
      attributes: { exclude: [ 'passwordHash' ] }
    })
  }
}

module.exports = Main
