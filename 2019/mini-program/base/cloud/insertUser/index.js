// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
    const wxContext = cloud.getWXContext()
    const db = cloud.database()

    let result = {
        code: 1,
        data: {},
        msg: '注册用户成功'
    }

    const users = await db.collection('user').where({_openId: wxContext.OPENID}).get().then(res => {
        return res.data
    })
    if (users.length == 0) {
        try {
            console.log('insert')
            let user = Object.assign({}, event);
            delete user.userInfo;
            await db.collection('user').add({
                data: {
                    ...user,
                    _openId: wxContext.OPENID
                }
            }).then(res => {
                result.data = {
                    ...user,
                    _openId: wxContext.OPENID
                }
            }).catch(e => {
                console.log(e)
            })
        }
        catch (e) {
            console.error(e)
        }
    } else {
        result.code = 2
        result.data = users[0];
        result.msg = '用户已注册';
    }

    return result
}