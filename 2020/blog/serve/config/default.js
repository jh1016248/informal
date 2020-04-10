module.exports = {
  port: 3030,
  secret: 'blog_secret',
  wechat: {
    appId: 'wx25094b1596babdb1',
    secret: '62470b8258a608546baf8fd531522d17',
  },
  mongodb: {
    uri: 'mongodb://localhost:27017/blog',
    options: {
      useNewUrlParser: true,
      useCreateIndex: true
    }
  },
  resolveUrls: ['/api/user/login','/api/user/signup']
}
