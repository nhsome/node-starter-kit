'use strict'

const User = require('./User')

module.exports = function(models, passwordHash) {
  return {
    user: new User(models, 'User', passwordHash)
  }
}
