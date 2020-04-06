const mongoose = require('mongoose')
const database = require('../libs/database')

const ArticleSchema = new mongoose.Schema({
    id: {type: Number},
    categoryId: {type: Number},
	author: {type: Number},
	authorName: {type: String},
    title: {type: String},
    content: {type: String},
    thumb: {type: String},
    describe: {type: String},
    viewNum: {type: Number},
    createTime: {type: Date},
}, {versionKey: false})

module.exports = database.model('article', ArticleSchema, 'articles');