const Comment = require('../controller/comment')

exports.commentRouter = router => {
    router
        .get('/getComment', Comment.getComment)
}