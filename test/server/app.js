const Koa = require('koa')
const path = require('path')
const serve = require('koa-static')
const views = require('koa-views')
const koaBody = require('koa-body')
const logger = require('koa-logger')
const onerror = require('koa-onerror')
const router = require('./routes')
const CONFIG = require('./config/default')
require('./libs/database')

const app = new Koa()

app.use(logger())
app.use(koaBody({ multipart: true }))

// 跨域设置 
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  await next()
})

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (ctx.method == 'OPTIONS') {
    ctx.body = 200;
  } else {
    await next();
  }
});


// static
app.use(serve(path.join(__dirname, '/public')))

// views
app.use(views(path.join(__dirname, 'view'), {
  map: { html: 'nunjucks' }
}))

// error
onerror(app)

// router
router(app)

app.listen(CONFIG.port, () => {
  console.log(`Server running at http://127.0.0.1:${CONFIG.port}/`)
})
