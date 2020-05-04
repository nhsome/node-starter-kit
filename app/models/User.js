'use strict'

const Roles = require('../kernel/Roles')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      firstName: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      passwordHash: { type: DataTypes.STRING, allowNull: false },
      role: { type: DataTypes.ENUM, values: Roles.ALL },
      deleted: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
      fullName: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${ this.firstName } ${ this.lastName }`.trim()
        },
        set() {
          throw new Error('Do not try to set the `fullName` value!')
        }
      }
    },
    {}
  )
  User.associate = function(models) {
  }
  return User
}
