const Article = require('../models/article')

exports.getArticles = async ( ctx, next ) => {
    const { page, size } = ctx.request.query;
    const res = await Article.find().skip(Number(page)).limit(Number(size)).sort({'_id':-1});
    console.log(res)
    ctx.body = {
        code: 200,
        data: res
    }
}

exports.getArticleDetail = async ( ctx, next ) => {
    const { id } = ctx.request.query;
    const res = await Article.findById(id);
    ctx.body = {
        code: 200,
        data: res
    }
}