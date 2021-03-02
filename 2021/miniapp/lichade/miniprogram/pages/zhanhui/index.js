//index.js
const app = getApp()
import message from '../../utils/message.js';
Page({
    data: {
        lang: 'zh',
        messsage: message.zh,
        isExist: false,
        userInfo: {
            phone: '',
        },
        visiblePopover: false,

        strategyList: [{
                number: '../../static/index/n-1.png',
                title: '../../static/index/text-tijiaodingdan.png',
                enTitle: 'Submit an order',
                text: 'strategy1'
            },
            {
                number: '../../static/index/n-2.png',
                title: '../../static/index/text-xitongjiedan.png',
                enTitle: 'The system takes orders',
                text: 'strategy2'
            },
            {
                number: '../../static/index/n-3.png',
                title: '../../static/index/text-xitongpaichan.png',
                enTitle: 'System scheduling',
                text: 'strategy3'
            },
            {
                number: '../../static/index/n-4.png',
                title: '../../static/index/text-jiqishengchan.png',
                enTitle: 'Machine production',
                text: 'strategy4'
            },
            {
                number: '../../static/index/n-5.png',
                title: '../../static/index/text-tongzhiqujian.png',
                enTitle: 'Notification of pick-up',
                text: 'strategy5'
            },
        ]
    },

    onLoad: function () {
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            this.setData({
                                avatarUrl: res.userInfo.avatarUrl,
                                userInfo: res.userInfo
                            })
                        }
                    })
                }
            }
        })
    },
    toOrder() {

    },
    toLogin() {

    },
})