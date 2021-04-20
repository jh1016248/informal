const CONFIG = require('../config/default')

exports.list = async (ctx, next) => {
    const { pageSize = 10, pageIndex = 0 } = ctx.request.query;
    const list = await ctx.utils.mysql(`SELECT * FROM categorys order by createTime desc limit ${pageSize * pageIndex}, ${pageSize} `)
    list.forEach(item => {
        item.createTime = ctx.utils.dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss')
    })
    ctx.body = {
        code: 200,
        data: list
    }
}
