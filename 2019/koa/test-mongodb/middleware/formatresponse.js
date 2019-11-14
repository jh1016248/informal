module.exports = async ( ctx, next ) => {
    await next().then(() => {
        if(ctx.status == 200) {
            ctx.body = {
                message: '成功',
                code: 200,
                body: ctx.body,
                status: true
            }
        }
        else {
            ctx.body =  {
                message: ctx.body || '接口异常，请重试',
                code: ctx.status,
                body: '接口请求失败',
                status: false
            }
        }
    }).catch(err => {
        if(err.status === 401) {
            ctx.status = 401;
            ctx.body = {
                message: '登录过期，请重新登录',
                code: 401,
                status: true
            }
        }
        else {
            throw err
        }
    })
}
