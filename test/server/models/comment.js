const mongoose = require('mongoose')
const database = require('../libs/database')

const CommentSchema = new mongoose.Schema({
    id: {type: String},
    articleId: {type: String},
    author: {type: Number},
    authorName: {type: String},
    thumb: {type: String},
    repliesId: {type: Number},
    content: {type: String},
    createTime: {type: Date},
}, {versionKey: false})

module.exports = database.model('comment', CommentSchema, 'comments');