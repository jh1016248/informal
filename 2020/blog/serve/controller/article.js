exports.list = async ( ctx, next ) => {
    const { pageSize = 10, pageIndex = 0} = ctx.request.query;
    const list = await ctx.utils.mysql(`SELECT * FROM articles order by createTime desc limit ${pageSize * pageIndex}, ${pageSize} `)
    list.forEach(item => {
        item.createTime = ctx.utils.dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss')
    })
    ctx.body = {
        code: 200,
        data: list
    }
}
exports.detail = async ( ctx, next ) => {
    const { pageSize = 10, pageIndex = 0, id} = ctx.request.query;
    const list = await ctx.utils.mysql(`
        SELECT  
            a.*,
            u.name as authorName 
        from users as u left join articles as a ON(a.author = u.id) WHERE a.id = '${id}' 
        order by createTime desc limit ${pageSize * pageIndex}, ${pageSize}
    `)
    list && list.forEach(item => {
        item.createTime = ctx.utils.dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss')
    })
    ctx.body = {
        code: 200,
        data: list[0]
    }
}
