const router = require('koa-router')()
const Home = require('../controller/home')
const user = require('./user')
const article = require('./article')
const comment = require('./comment')

module.exports = (app) => {
  router.get('/', Home.index)
  router.get('/about', Home.about)

  router.use('/api',
    user.routes(), user.allowedMethods(),
    article.routes(), article.allowedMethods(),
    comment.routes(), comment.allowedMethods(),
  )
  
  app
    .use(router.routes())
    .use(router.allowedMethods())
}
