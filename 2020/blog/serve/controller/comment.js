const Comment = require('../models/comment')

exports.getComment = async ( ctx, next ) => {
    const { articleId } = ctx.request.query;
    const res = await Comment.find({ articleId })
    ctx.body = {
        code: 200,
        data: res
    }
}

exports.sendComment = async ( ctx, next ) => {
    const { articleId, content, repliesId = '' } = ctx.request.body;
    const now = new Date();
    const user = ctx.user;

    console.log(user)

    // id: {type: String},
    // articleId: {type: String},
    // author: {type: Number},
    // authorName: {type: String},
    // thumb: {type: String},
    // repliesId: {type: Number},
    // content: {type: String},
    // createTime: {type: Date},
    const comment = {  
        articleId,
        content,
        createTime: now,
        repliesId, 
        author: user._id,
        authorName: user.account,
        authorAvatar: user.avatar,
    }
    try{
        const res = await Comment.create(comment)
        ctx.body = {
            code: 200,
            data: res
        }
    }
    catch (e){
        ctx.body = {
            code: 0,
            data: e,
            message: '留言失败'
        }
    }
}
