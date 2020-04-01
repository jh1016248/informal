const router = require('koa-router')()
const Home = require('../controller/home')
const userRouter = require('./user').userRouter
console.log(userRouter)

module.exports = (app) => {
  router.get('/', Home.index)
  router.get('/about', Home.about)
  userRouter(router)
  app
    .use(router.routes())
    .use(router.allowedMethods())
}
