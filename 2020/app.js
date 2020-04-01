const Koa = require('koa')
const path = require('path')
const serve = require('koa-static')
const views = require('koa-views')
const koaBody = require('koa-body')
const logger = require('koa-logger')
const onerror = require('koa-onerror')
const router = require('./routes')
const CONFIG = require('./config/default')

const app = new Koa()

app.use(logger())
app.use(koaBody({ multipart: true }))

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
