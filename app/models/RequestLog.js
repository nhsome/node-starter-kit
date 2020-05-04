'use strict'

module.exports = (sequelize, DataTypes) => {
  const RequestLog = sequelize.define(
    'RequestLog',
    {
      routePath: { type: DataTypes.STRING, allowNull: false },
      routeMethod: { type: DataTypes.STRING, allowNull: false },
      params: { type: DataTypes.JSON },
      query: { type: DataTypes.JSON },
      body: { type: DataTypes.JSON },
      isError: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
      result: { type: DataTypes.JSON },
      ip: { type: DataTypes.STRING }
    },
    {}
  )
  RequestLog.associate = function (models) {
    RequestLog.belongsTo(models.User)
  }
  return RequestLog
}
