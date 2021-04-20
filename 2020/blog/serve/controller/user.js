const CONFIG = require('../config/default')
const jsonwebtoken = require('jsonwebtoken');

module.exports = {
    async login(ctx, next) {
        const { account, password } = ctx.request.body;
        const sql = `SELECT * FROM users WHERE account="${account}" AND password="${password}"`;
        const res = await ctx.utils.mysql(sql)
        const user = res[0]
        if(user) {
            const userToken = {account: user.account, name: user.name, id: user.id};
            const token = jsonwebtoken.sign(userToken, CONFIG.secret, { expiresIn:  '1h' });
            ctx.body = {
                code: 200,
                data: {
                    token: token
                },
            }
        }
        else {
            ctx.body = {
                code: 0,
                data: {},
                message: '账号或者密码错误，请重新登录'
            }
        }
    },
    async register(ctx, next) {
        const { account, password } = ctx.request.body;
        const uid = ctx.utils.uuid.v1()
        const query = `SELECT * FROM users WHERE account="${account}"`;
        const haveUser = await ctx.utils.mysql(query);
        if(haveUser.length) {
            ctx.body = {
                code: 0,
                message: '该账号已注册，请登录',
                data: {},
            }
            return 
        }
        const sql = `INSERT INTO users (id, name, account, password) VALUES ("${uid}", "${account}", "${account}", "${password}")`;
        const res = await ctx.utils.mysql(sql)
        if(res.affectedRows >= 1) {
            ctx.body = {
                code: 200, 
                data: {},
                message: '注册成功！'
            }
        }
        else {
            ctx.body = {
                code: 0, 
                data: {},
                message: '注册失败！'
            }
        }
    },
    async signup(ctx, next) {
        const body = ctx.request.body;
        const user = {
            account: body.account,
            password: body.password,
            name: body.account
        }
        const oldUser = await UserModel.findOne({ account: user.account })
        if(oldUser && oldUser._id) {
            ctx.body = {
                code: 0,
                message: '该用户名已注册，请使用其他账号'
            }
            return 
        }
        const result = await UserModel.create(user)
        if(result._id) {
            ctx.body = {
                code: 200,
                message: '注册成功'
            }
        }
    },
    async getCurrent(ctx, next) {
        console.log(ctx.user)
        if(ctx.user) {
            ctx.body = {
                code: 200,
                data: {
                    ...ctx.user
                }
            }
        }
        else {
            ctx.body = {
                code: 0,
                message: '请登录'
            }
        }
    },
}
