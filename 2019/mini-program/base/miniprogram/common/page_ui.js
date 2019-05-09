const DEFAULT_SHOW_DURATION = 2000
const addPageUIUtil = function (pageObj) {
    wx.getSystemInfo({
        success: function (res) {
            pageObj.data.isIpx = res.model.indexOf('iPhone X') >= 0
        }
    })
    /**
     * 弹出toast
     * @param  {String} msg 消息
     * @param  {Object} options 选项
     */
    pageObj.$showToast = function (msg, options) {
        const duration = options && options.duration ? options.duration : DEFAULT_SHOW_DURATION;
        this.setData({
            '$toastData': {
                visible: true,
                toastMessage: msg,
                topValueInFixedPositon: options && options && options.topValueInFixedPositon,
            }
        }, () => {
            setTimeout(() => {
                this.setData({
                    '$toastData.visible': false,
                })
            }, duration)
        }) 
    }


    pageObj.$showLoading = function (opt, delayTime) {
        this.setData({
            $loadingVisible: true
        })
    };

    pageObj.$hideLoading = function () {
        this.setData({
            $loadingVisible: false
        })
    };

}

export default addPageUIUtil