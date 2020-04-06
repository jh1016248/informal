const Article = require('../controller/article')

exports.articleRouter = router => {
    router
        .get('/getArticles', Article.getArticles)
        .get('/getArticleDetail', Article.getArticleDetail)
}