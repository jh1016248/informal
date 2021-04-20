exports.list = async ( ctx, next ) => {
    const { pageSize = 10, pageIndex = 0, articleId } = ctx.request.query;
    const list = await ctx.utils.mysql(`
        SELECT  
        c.*,
        u.name as authorName 
        from comments c join users u ON c.author = u.id  WHERE c.articleId = '${articleId}' AND c.replyId = '0'
        order by createTime desc limit ${pageSize * pageIndex}, ${pageSize}
    `)
    list.forEach(item => {
        item.createTime = ctx.utils.dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss')
    })
    ctx.body = {
        code: 200,
        data: list
    }
}

exports.replyList = async ( ctx, next ) => {
    const { articleId } = ctx.request.query;
    const list = await ctx.utils.mysql(`
        SELECT  
        c.*,
        u.name as authorName 
        from comments c join users u ON c.author = u.id  WHERE c.articleId = '${articleId}' AND c.replyId != '0'
        order by createTime desc
    `)
    list.forEach(item => {
        item.createTime = ctx.utils.dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss')
    })
    ctx.body = {
        code: 200,
        data: list
    }
}

exports.apply = async ( ctx, next ) => {
    const { content, id, replyId = '0' } = ctx.request.body;
    const authorId = ctx.user.id;
    const data = {
        id: ctx.utils.uuid.v1(), 
        author: authorId,
        articleId: id,
        content: content,
        createTime: ctx.utils.dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        replyId
    }
    const sql = `
        INSERT INTO comments (id, author, articleId, content, createTime, replyId) VALUES (
            "${data.id}", "${data.author}", "${data.articleId}", "${data.content}", "${data.createTime}", "${data.replyId}")`;
    const res = await ctx.utils.mysql(sql)
    if(res.affectedRows >= 1) {
        ctx.body = {
            code: 200, 
            data: {},
            message: '评论成功！'
        }
    }
    else {
        ctx.body = {
            code: 0, 
            data: {},
            message: '评论失败！'
        }
    }
}
