'use strict'

const { Dao, DaoValidationError } = require('./Base')

class User extends Dao {
  constructor(models, modelName, passwordHash) {
    super(models, modelName)
    this.passwordHash = passwordHash
  }

  async create(data, transaction) {
    if (!data.password) throw new DaoValidationError('Password is required')
    data.passwordHash = await this.passwordHash.hash(data.password)
    return super.create(data, transaction)
  }

  async update(user, data, transaction) {
    if (data.passwordHash && data.passwordHash !== user.passwordHash ) {
      throw new DaoValidationError('Your cannot update passwordHash, use password field')
    }
    if (data.password) {
      data.passwordHash = await this.passwordHash.hash(data.password)
    }
    return super.update(user, data, transaction)
  }
}

module.exports = User
