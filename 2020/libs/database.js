const mongoose = require('mongoose')
const config = require('../config/default')

const database = mongoose.connect(`mongodb://${config.mongodb.uri}/${config.mongodb.name}`)

/* eslint-disable no-console */
database.connection.on('error', function (error) {  
  console.log('数据库连接失败：' + error)
})

database.connection.on('open', function () {  
  console.log('数据库连接成功')
})

module.exports = database
