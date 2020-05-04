const routes = require('./routes.js'),
  HttpError = require('standard-http-error'),
  { DaoValidationError } = require('../services/dao/Base')

class Router {
  constructor(server, initObj) {
    this.server = server
    this.initObj = initObj
    this.services = this.initObj.services
    this.logger = this.initObj.logger
    this.config = this.initObj.config
  }

  /**
   * @returns {void}
   */
  addEventsListeners() {
    routes.forEach((route) => {
      let Controller = require('../controllers/' + route.controller)
      let controller = new Controller(this.initObj)

      route.path = (this.config.indexRoute || '') + route.path

      this.server[route.method](route.path, async (req, res, next) => {
        let result, error
        try {
          await this._setUser(req, route)
          result = controller[route.action](req, res, next)
          await this._sendResponse(result, res)
        } catch(err) {
          error = this._handleError(err, res)
        }

        if (route.log) {
          this._logRequest(route, req, error, result)
            .catch(this.logger.error)
        }
      })
    })
  }

  /**
   * @param {any} actionResult
   * @param {Object} res
   * @returns {Promise<void>}
   * @private
   */
  async _sendResponse(actionResult, res) {
    if (typeof actionResult.then === 'function') {
      //is Promise
      actionResult = await actionResult
      if (!res.headersSent) res.send(actionResult)
    } else {
      if (!res.headersSent) res.send(actionResult)
    }
  }

  /**
   * @param {Object} route
   * @param {Object} req
   * @param {Error|undefined} error
   * @param {any} result
   * @returns {Promise<void>}
   * @private
   */
  async _logRequest(route, req, error, result) {
    let lresult = error
      ? error
      : route.logSuccessResult !== undefined && !route.logSuccessResult ? null : result
    return this.services.requestsLogger.log(route, req, lresult, {
        isError: Boolean(error),
        logBody: route.logBody !== undefined ? route.logBody : true
      })
  }

  /**
   * @param {Object} req
   * @param {Object} route
   * @returns {Promise<void>}
   * @private
   */
  async _setUser(req, route) {
    let token = req.headers.authorization
    token = token ? token.replace('Bearer ', '') : token

    try {
      let decodedToken = await this.services.authJwt.verifyToken(token)
      req.user = decodedToken.data
    } catch(e) {
      if (!route.accessible.length) return
      throw new HttpError(401, 'Invalid auth token provided.')
    }
    if (!Router._isUserHasAcess(route, req.user)) throw new HttpError(403, 'You are not have permissions')
  }

  /**
   * @param {Object} route
   * @param {Model} user
   * @returns {boolean}
   * @private
   */
  static _isUserHasAcess(route, user) {
    if (!route.accessible.length) return true
    if (!user) return false
    return (route.accessible.indexOf(user.role) !== -1)
  }

  /**
   * @param {Error} err
   * @param {Object} res
   * @returns {{code: Number, message: String}}
   * @private
   */
  _handleError(err, res) {
    let code = 500
    let message = err.message
    if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
      code = 400
      message = err.errors[0] ? err.errors[0].message : err.message
    } else if (err instanceof HttpError) {
      code = 400
    } else if (err instanceof DaoValidationError) {
      code = 400
    }

    if (code === 500) {
      this.logger.error(err)
    } else {
      this.logger.warn(err)
    }

    res.status(code)
      .send({ error: message })
    return { code, message }
  }
}

module.exports = Router
