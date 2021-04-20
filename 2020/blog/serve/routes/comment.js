const router = require('koa-router')()
const Comment = require('../controller/comment')

const routers = router
    .get('/comment/list', Comment.list)
    .post('/comment/apply', Comment.apply)

module.exports = routers