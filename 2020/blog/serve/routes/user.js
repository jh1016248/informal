const router = require('koa-router')()
const User = require('../controller/user')

const routers = router
  .post('/user/login', User.login)
  .post('/user/register', User.register)
  .get('/user/current', User.getCurrent)

module.exports = routers
