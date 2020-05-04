const jwt = require('jsonwebtoken'),
  _ = require('lodash')

class AuthJwt {
  static get TOKEN_ALGORITHM() {
    return 'HS256'
  }

  constructor(jwtSecret, maxAge) {
    this.jwtSecret = jwtSecret
    this.maxAge = maxAge
  }

  /**
   * @param {String} token
   * @returns {Promise<Object>}
   */
  verifyToken(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, this.jwtSecret, (err, decodedToken) => {
        if (err || !decodedToken) {
          return reject(err)
        }
        resolve(decodedToken)
      })
    })
  }

  /**
   * @param {String} sessionData
   * @returns {String}
   */
  createToken(sessionData) {
    return jwt.sign(
      { data: sessionData },
      this.jwtSecret,
      {
        expiresIn: this.maxAge,
        algorithm: AuthJwt.TOKEN_ALGORITHM
      }
    )
  }
}

module.exports = AuthJwt
