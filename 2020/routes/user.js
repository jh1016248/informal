exports.userRouter = router => {
  router.get('/user', (ctx, next) => {
    ctx.body = 'user'
  })
}
