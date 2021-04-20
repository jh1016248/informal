exports.index = async (ctx, next) => {
  const res = await ctx.utils.mysql('SELECT * FROM tiehu.users')
  await ctx.render('index', {
    title: 'Koa2-starter',
    list: JSON.stringify(res),
  })
}

exports.about = async (ctx, next) => {
  ctx.body = 'about1'
}
