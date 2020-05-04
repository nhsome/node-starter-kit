'use strict'

class Roles {
  /**
   * @returns {String}
   */
  static get ADMIN() {
    return 'ADMIN'
  }

  /**
   * @returns {String}
   */
  static get MODERATOR() {
    return 'MODERATOR'
  }

  /**
   * @returns {String[]}
   */
  static get ALL() {
    return [ Roles.ADMIN, Roles.MODERATOR ]
  }

  /**
   * @param {String} role
   * @returns {Boolean}
   */
  static isValidRole(role) {
    return (Roles.ALL.indexOf(role) !== -1)
  }
}

module.exports = Roles
