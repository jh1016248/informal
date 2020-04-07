module.exports = {
  port: 3030,
  secret: 'blog_secret',
  mongodb: {
    uri: 'mongodb://localhost:27017/blog',
    options: {
      useNewUrlParser: true,
      useCreateIndex: true
    }
  },
  resolveUrls: ['/api/user/login','/api/user/signup']
}
