'use strict'

const Helper = require('./Base')

class MainHelper extends Helper {
  /**
   * @typedef { import('sequelize').Transaction } Transaction
   */

  /**
   * @typedef { import('sequelize').Model } Model
   */

  /**
   *
   * @param {String} model (name of model)
   * @param {Object} condition
   * @param {Object} values
   * @param {Transaction|undefined} transaction
   * @returns {Promise<Model>}
   */
  async createOrUpdate(model, condition, values, transaction = undefined) {
    let dbRow = await this.models[model].findOne({ where: condition, transaction })
    if (dbRow)
      return dbRow.update(values, { transaction })
    return this.models[model].create(values, { transaction })
  }

  /**
   * @param {string} searchParam
   * @param {string} queryFieldName
   */
  likeLower(searchParam, queryFieldName) {
    return this.models.sequelize.where(this.models.sequelize.fn('lower', this.models.sequelize.col(queryFieldName)), {
      $like: `%${ searchParam.toLowerCase() }%`
    })
  }
}

module.exports = MainHelper