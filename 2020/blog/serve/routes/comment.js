const router = require('koa-router')()
const Comment = require('../controller/comment')

const routers = router
    .get('/comment/list', Comment.list)
    .post('/comment/reply', Comment.reply)
    .get('/comment/replyList', Comment.replyList)

module.exports = routers