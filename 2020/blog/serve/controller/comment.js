const Comment = require('../models/comment')
const Reply = require('../models/Reply')

exports.getComment = async ( ctx, next ) => {
    const { articleId } = ctx.request.query;
    const list = await Comment.find({ articleId })
    let index = 0;
    const findChildren = async () => {
        if(index >= list.length - 1) {
            ctx.body = {
                code: 200,
                data: list
            }
            return
        }
        const item = list[index];
        item.children = await Reply.find({ replyId: item._id })
        index ++;
        findChildren()
    }
    findChildren()
}

exports.sendComment = async ( ctx, next ) => {
    const { articleId, content, replyId = '', replyUserId = '', replyUserName = '' } = ctx.request.body;
    const now = new Date();
    const user = ctx.user;
    const comment = {
        articleId,
        content,
        createTime: now,
        replyId, 
        replyUserId,
        replyUserName,
        author: user._id,
        authorName: user.account,
        authorAvatar: user.avatar,
    }

    if(replyId !== '') {
        try{
            const res = await Reply.create(comment)
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
    else {
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
}
