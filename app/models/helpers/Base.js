'use strict'

/**
 * Base class for models helper
 */
class ModelHelper {
  /**
   * @param {Object} options - db options from config
   * @param models
   */
  constructor(options, models) {
    this.options = options
    this.models = models
  }
}

module.exports = ModelHelper
