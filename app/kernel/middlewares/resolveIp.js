'use strict'

function _getIp(req) {
  let ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.connection.remoteAddress

  if (ip.substr(0, 7) === "::ffff:")
    ip = ip.substr(7)

  if (ip.indexOf(',') === -1) return ip

  return ip.split(',')[0]
}

module.exports = function resolveIp(req, res, next) {
  req.resolvedIp = _getIp(req)
  next()
}
