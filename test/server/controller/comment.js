const Comment = require('../models/comment')

exports.getComment = async ( ctx, next ) => {
    const { articleId } = ctx.request.query;
    const res = await Comment.find({ articleId })
    ctx.body = {
        code: 200,
        data: res
    }
}
