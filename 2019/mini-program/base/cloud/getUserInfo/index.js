// 云函数入口文件
const cloud = require('wx-server-sdk')
const request = require('request')
cloud.init()


// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const db = cloud.database()
    let result = {
        code: 1,
        data: {},
        message: ''
    }

    await request('https://news-at.zhihu.com/api/4/news/latest', function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
    });

    const users = await db.collection('user').where({ _openId: wxContext.OPENID }).get().then(res => {
        return res.data
    })
    
    if(users.length == 0) {
        result.code = 2
    }
    else {
        result.data = users[0];
    }

    return result
}