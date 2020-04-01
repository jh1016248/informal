const Koa = require('koa')
const router = require('koa-router')()
const path = require('path')
const koaStatic = require('koa-static')
const koaBody = require('koa-body')
const cors = require('koa-cors')
const koajwt = require('koa-jwt')
const mongoConf = require('./config/mongo')
const jsonwebtoken = require('jsonwebtoken')
const formatresponse = require('./middleware/formatresponse')
const fs = require('fs')


const app = new Koa();
const SECRET = 'tiehu'; // 加密参数

//配置静态web
app.use(koaStatic(__dirname + '/public'), { gzip: true, setHeaders: function (res) {
    res.header('Access-Control-Allow-Origin', '*')
}})
//跨域处理
app.use(cors())

/**
 * post接口数据处理
 */
app.use(koaBody({
    multipart: true
}))


// 认证授权
app.use(koajwt({ secret: SECRET }).unless({
    path: [ //排除
        /^\/user\/login/
    ]
}))

router.use(async (ctx, next) => {
    let token = ctx.headers.authorization
    if(token) {
        ctx.state.user =  jsonwebtoken.verify(token.split(' ')[1], SECRET)
    }
    console.log(ctx.state.user)
    ctx.state.SECRET = SECRET
    await next()
})


// 链接数据库
mongoConf.connect();

//配置路由
fs.readdirSync(path.join(__dirname, './routes')).forEach(route => {
    let api = require(`./routes/${route}`)
    router.use(`/${route.replace('.js', '')}`, api.routes())
})

app.use(formatresponse)

app.use(router.routes())
app.use(router.allowedMethods())



app.listen(4000)

console.log('app listen for: http://localhost:4000')
