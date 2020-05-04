'use strict'

const Controller = require('./Base'),
  HttpError = require('standard-http-error')

class Auth extends Controller {
  async authVerify(req) {
    const user = await this.models.User.findOne({
      where: { email: req.body.email, deleted: false }
    })
    if (!user) throw new HttpError(400, 'Bad credentials')

    const isVerifiedPassword = await this.services.passwordHash.compare(req.body.password, user.passwordHash)

    if (!isVerifiedPassword) {
      throw new HttpError(400, 'Bad credentials')
    }

    const token = this.services.authJwt.createToken(user.toJSON())

    req.user = user

    return { result: 'success', token }
  }
}

module.exports = Auth
