'use strict'

class RequestsLogger {
  constructor(models) {
    this.models = models
  }

  /**
   * @param {Object} route from routes.js
   * @param {Object} req from express
   * @param {Object} result of request
   * @param {boolean} logBody
   * @param {boolean} isError
   * @returns Promise<Model> RequestLog
   */
  log(route, req, result, { isError = false, logBody = true }) {
    return this.models.RequestLog.create({
      routePath: route.path,
      routeMethod: route.method,
      params: RequestsLogger.cleanObject(req.params) || null,
      query: RequestsLogger.cleanObject(req.query) || null,
      body: logBody ? (RequestsLogger.cleanObject(req.body) || null) : null,
      isError,
      result: RequestsLogger.cleanObject(result) || null,
      UserId: req.user && req.user.id,
      ip: req.resolvedIp || null
    })
  }

  static cleanObject(obj) {
    return typeof obj === 'object' && obj !== null && Object.keys(obj).length ? obj : null
  }
}

module.exports = RequestsLogger
