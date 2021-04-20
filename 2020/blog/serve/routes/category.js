const router = require('koa-router')()
const Category = require('../controller/category')

const routers = router
  .get('/category/list', Category.list)

module.exports = routers
