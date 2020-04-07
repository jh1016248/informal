const jwt = require('jsonwebtoken')
const util = require('util')
const verify = util.promisify(jwt.verify) // 解密
const CONFIG = require('../config/default')

module.exports = async (ctx, next) => {
  const token = ctx.headers.authorization
  const url = ctx.request.url;
  if(CONFIG.resolveUrls.includes(url)) {
    await next();
    return 
  }
  console.log(1)
  if(!token) {
    await next()
  }
  else {
    try{
      const res = await verify(token.split(' ')[1], CONFIG.secret)
      ctx.user = res;
      await next()
    }
    catch(e) {
      console.log(JSON.parse(JSON.stringify(e)))
      if(e.message === 'invalid signature') {
        ctx.body = {
          code: 401,
          message: '登录状态丢失，请重新登录'
        }
      }
    }
  }
}