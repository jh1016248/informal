exports.list = async ( ctx, next ) => {
    const { pageSize = 10, pageIndex = 0, articleId } = ctx.request.query;
    const list = await ctx.utils.mysql(`
        SELECT  
        c.*,
        u.name as authorName
        from comments c join users u ON c.author = u.id  WHERE c.articleId = '${articleId}' AND c.replyId = '0'
        order by createTime asc limit ${pageSize * pageIndex}, ${pageSize}
    `)
    const total = await ctx.utils.mysql(`
        SELECT count(*) as total FROM comments WHERE replyId = '0'
    `)
    list.forEach(item => {
        item.createTime = ctx.utils.formatDate(item.createTime)
    })
    ctx.body = {
        code: 200,
        data: {
            list,
            total: total[0].total
        }
    }
} 

exports.replyList = async ( ctx, next ) => {
    const { pageSize = 10, pageIndex = 0, articleId } = ctx.request.query;
    let list = await ctx.utils.mysql(`
        SELECT  
        c.*,
        u.name as authorName 
        from comments c join users u ON c.author = u.id  WHERE c.articleId = '${articleId}' AND c.replyId = '0'
        order by createTime asc limit ${pageSize * pageIndex}, ${pageSize}
    `)
    
    if(!list.length) {
        return ctx.body = {
            code: 200,
            data: [],
        }
    }

    list = list.map(item => item.id).join('","')
    const res = await ctx.utils.mysql(`
        select c.*,  ua.name as authorName,  ur.name as replyUserName
        from comments c
        left join users ua on c.author = ua.id
        left join users ur on c.replyUserId = ur.id  WHERE c.articleId = '${articleId}' AND c.replyId in("${list}")
        order by createTime asc
    `)
    res.forEach(item => {
        item.createTime = ctx.utils.formatDate(item.createTime)
    })
    ctx.body = {
        code: 200,
        data: res
    }
}

exports.reply = async ( ctx, next ) => {
    const { content, id, replyId = '0', replyUserId = "" } = ctx.request.body;
    const authorId = ctx.user.id;
    
    const data = {
        id: ctx.utils.uuid.v1(), 
        author: authorId,
        articleId: id,
        content: content,
        createTime: ctx.utils.formatDate(),
        replyId,
        replyUserId,
    }
    const sql = `
        INSERT INTO comments (id, author, articleId, content, createTime, replyId, replyUserId) VALUES (
            "${data.id}", "${data.author}", "${data.articleId}", "${data.content}", "${data.createTime}", "${data.replyId}", "${data.replyUserId}")`;
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
