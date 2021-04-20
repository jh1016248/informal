const router = require('koa-router')()
const Article = require('../controller/article')

const routers = router
    .get('/article/list', Article.list)
    .get('/article/detail', Article.detail)

module.exports = routers