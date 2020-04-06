const router = require('koa-router')()
const Home = require('../controller/home')
const articleRouter = require('./article').articleRouter
const commentRouter = require('./comment').commentRouter

module.exports = (app) => {
  router.get('/', Home.index)
  router.get('/about', Home.about) 
  articleRouter(router)
  commentRouter(router)
  app
    .use(router.routes())
    .use(router.allowedMethods())
}
