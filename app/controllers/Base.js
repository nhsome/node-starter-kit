'use strict'

const HttpError = require('standard-http-error'),
  pathResolve = require('path').resolve,
  randToken = require('rand-token'),
  fs = require('fs-extra')

class Controller {
  constructor({ config, models, rabbitConnection, services, logger }) {
    this.config = config
    this.models = models
    this.rabbitConnection = rabbitConnection
    this.services = services
    this.logger = logger
  }

  /**
   * @param {String} modelName
   * @param {Number} id
   * @returns {Promise<Model>}
   * @protected
   */
  async _findInstanceRequired(modelName, id) {
    const instance = await this.models[modelName].findByPk(id)
    if (!instance) {
      throw new HttpError(400, 'Not found user')
    }
    return instance
  }

  /**
   * @typedef { import('sequelize').FindAndCountOptions } FindAndCountOptions
   */
  /**
   * @param req
   * @returns {FindAndCountOptions}
   * @protected
   */
  static _getDefaultShowOptions(req) {
    return {
      offset: (Number(req.query.offset) > 0) ? Number(req.query.offset) : 0,
      limit: (Number(req.query.limit) > 0) ? Number(req.query.limit) : 20,
      where: {
        deleted: [ '1', '0' ].includes(req.query.deleted) ? !!Number(req.query.deleted) : false
      },
      order: [ [ 'createdAt', 'DESC' ] ]
    }
  }

  /**
   * @param {Object} file
   * @returns {Promise<void>}
   * @private
   */
  _saveFileToStaticDir(file) {
    const fileArr = file.name.split('.')
    const fileName = `${ fileArr[0] }-${ randToken.generate(16) }.${ fileArr[fileArr.length - 1] }`
    return new Promise((resolve, reject) => {
      file.mv(`${ this.staticPath }/${ fileName }`, (err) => {
        if (err) return reject(err)
        resolve(`${ this.config.staticFolder }/${ fileName }`)
      })
    })
  }

  /**
   * @param {String} fileName
   * @returns {Promise<Buffer>}
   * @protected
   */
  static _readFileFromStaticDir(fileName) {
    return fs.readFile(pathResolve(`${ __dirname }/../${ fileName }`))
  }
}

module.exports = Controller
