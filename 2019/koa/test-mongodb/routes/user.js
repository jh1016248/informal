const router = require('koa-router')()
const Users = require('../models/user')
const mongoose = require('mongoose')
const jsonwebtoken = require('jsonwebtoken')

router.get('/list', async ctx => {
	ctx.body = await Users.find()
})
router.post('/login', async ctx => {
    const data = ctx.request.body
    const user = await Users.findOne({ username: data.username }).select('username _id password ')
    if(!user) {
        ctx.status = 202;
        ctx.body = '该账号未注册！'
        return
    }
    else if (data.password !== user.password) {
        ctx.status = 202;
        ctx.body = '密码错误！'
        return
    }

    let userToken = {
        name: user.username, 
        id: user._id
    }

    ctx.body = {
        token: jsonwebtoken.sign(userToken, ctx.state.SECRET, {expiresIn: '24h'})
    }
})

module.exports = router