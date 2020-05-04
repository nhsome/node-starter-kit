'use strict'

class DaoValidationError extends Error {
}

class Dao {
  constructor(models, modelName) {
    this.models = models
    this.modelName = modelName
  }

  get model() {
    return this.models[this.modelName]
  }

  /**
   * @param {Object} data for update
   * @param {Transaction} transaction
   * @returns {Promise<Model>}
   */
  async create(data, transaction = undefined) {
    return this.model.create(data, { transaction })
  }

  /**
   * @param {Model} instance
   * @param {Object} data for update
   * @param {Transaction} transaction
   * @returns {Promise<Model>}
   */
  async update(instance, data, transaction = undefined) {
    Object.keys(instance.dataValues)
      .forEach(field => {
        if (data[field] !== undefined && field !== 'id') {
          instance[field] = data[field]
        }
      })
    await instance.save({ transaction })
    return instance
  }
}

module.exports = { Dao, DaoValidationError }
