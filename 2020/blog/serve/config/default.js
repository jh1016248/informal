module.exports = {
  port: 3030,
  secret: 'blog_secret',
  wechat: {
    appId: 'wx25094b1596babdb1',
    secret: '62470b8258a608546baf8fd531522d17',
  },
  whiteList: [
    /^\/api\/user\/login/, 
    /^\/api\/user\/register/,
    /^\/api\/article\/getArticles/,
    /^\/api\/article\/getArticleDetail/,
    /^\/api\/comment\/getComment/,
    /^\/api\/category\/list/,
    /^\/public/,
    /favicon.ico/,
  ]
}
