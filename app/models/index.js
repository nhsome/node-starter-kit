'use strict'

const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const basename = path.basename(__filename)
const config = require('./../kernel/config.js')
const db = {}

const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, config.db.options)

function readJsFiles(dir) {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter(file => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
    })
}

readJsFiles(__dirname)
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db)
  .forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db)
    }
  })

const helpersDir = __dirname + '/helpers'
readJsFiles(helpersDir)
  .filter(file => {
    return file !== 'Base.js'
  })
  .forEach(file => {
    let Helper = require(`${ helpersDir }/${ file }`)
    db[Helper.name] = new Helper(config.db, db)
  })

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db