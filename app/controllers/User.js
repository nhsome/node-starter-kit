const Controller = require('./Base'),
  HttpError = require('standard-http-error'),
  Roles = require('../kernel/Roles')

class User extends Controller {
  show(req) {
    const options = {
      ...Controller._getDefaultShowOptions(req),
      attributes: { exclude: [ 'passwordHash' ] }
    }

    if (req.query.email)
      options.where.email = req.query.email

    if (req.query.search) {
      const search = req.query.search
      options.where.$or = [
        this.models.MainHelper.likeLower(search, 'firstName'),
        this.models.MainHelper.likeLower(search, 'lastName'),
        this.models.MainHelper.likeLower(search, 'email')
      ]
    }

    if (req.query.excludeIds) {
      options.where.id = { $notIn: req.query.excludeIds }
    }

    return this.models.User.findAndCountAll(options)
  }

  async create(req) {
    const user = await this.services.dao.user.create({
      ...req.body,
      role: req.user && req.user.role === Roles.ADMIN ? (req.body.role || Roles.MODERATOR) : Roles.MODERATOR
    })
    return { result: 'success', user }
  }

  async update(req) {
    let user = await this._findInstanceRequired('User', req.params.id)
    if (req.user.role !== Roles.ADMIN && req.user.id !== user.id) {
      throw new HttpError(403, 'You dont have permissions for update this user!')
    }
    if (req.user.role !== Roles.ADMIN && req.body.role && req.body.role !== user.role) {
      throw new HttpError(403, 'You cannot update user\'s role!')
    }
    user = await this.services.dao.user.update(user, {
      ...req.body
    })

    return { result: 'success', user }
  }
}

module.exports = User