const mongoose = require('mongoose')
const config = require('../config/default')

const database = mongoose.createConnection(config.mongodb.uri, config.mongodb.options)

/* eslint-disable no-console */
database.then(() => {
  console.log('成功连接数据库 Mongodb')
}).catch(() => {
  console.log('连接数据库 Mongodb 失败')
})

module.exports = database