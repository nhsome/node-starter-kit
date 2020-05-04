'use strict'

const bcrypt = require('bcrypt')

class PasswordHash {
  constructor({ saltRounds = 10 } = {}) {
    this.saltRounds = saltRounds
  }

  /**
   * @param {String} password
   * @returns {Promise<String>}
   */
  hash(password) {
    return bcrypt.hash(password, this.saltRounds)
  }

  /**
   * @param {String} password
   * @param {String} hash
   * @returns {Promise<Boolean>}
   */
  compare(password, hash) {
    return bcrypt.compare(password, hash)
  }
}

module.exports = PasswordHash
