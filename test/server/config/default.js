module.exports = {
  port: 3030,
  mongodb: {
    uri: 'mongodb://127.0.0.1:27017/blog',
    options: {
      useNewUrlParser: true,
      useCreateIndex: true
    }
  }
}
