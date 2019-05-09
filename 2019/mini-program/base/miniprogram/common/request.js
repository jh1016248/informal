import Promise from '../libs/es6-promise.min'
import { host } from '../config/index';
const NETWORK_ERROR = '网络请求失败，请重试';
let app = undefined;

const Request = {
    /**
     * 发起请求
     * @param  {string} method           请求方法
     * @param  {string} url              请求路由
     * @param  {Object} params           请求参数
     * @param  {Object} opts             额外可选参数
     *      opts.needDevelop: boolean 扁平化params 
     *      opts.noFailMsg: boolean 请求失败(code != 0) 的时候不toast
     *      opts.dontNeedReLogin: boolean 没登录不重试登录
     *      opts.timeStamp: boolean 时间戳
     * @return {Object}                  返回请求的Promise
     */
    apiRequest(method, sourceUrl, params, needLogin = false, opts = {}) {

        let requestData = this.requestDataWithUrl(method, sourceUrl, params, needLogin, opts);
        return this.runRequest(requestData);

    },
    //请求前处理
    requestDataWithUrl(method, sourceUrl, params, needLogin, opts) {
        if (!app) {
            app = getApp()
        }
        let requestData = {};
        let requestConfig = {};
        //确定访问域名url
        let url = sourceUrl.includes('http') ? sourceUrl : host + sourceUrl;

        //是否需要加上时间戳
        if (opts.timeStamp) {
            let timeStamp = new Date().getTime();
            url = url.indexOf('?') >= 0 ? (url + '&t=' + timeStamp) : (url + '?t=' + timeStamp);
        }
        //是否需要加accessToken 
        if (needLogin && app.globalData.accessToken) {
            params.access_token = app.globalData.accessToken
        }
        //是否需要扁平化请求参数  数组会变成arr[0]=0,arr[1]=1
        if (opts && opts.needDevelop) {
            params = ObjectUtil.flatten(params)
        }

        requestConfig.url = url;
        requestConfig.method = method;
        requestConfig.data = params
        requestConfig.header = {
            'Content-Type': method === 'GET' ? 'application/json' : 'application/x-www-form-urlencoded',
        };
        requestData.requestConfig = requestConfig;
        requestData.opts = opts;
        return requestData;
    },
    //发起请求
    runRequest(requestData) {
        let that = this;
        let requestConfig = requestData.requestConfig;
        return new Promise((resolve, reject) => {
            requestConfig.success = function (res) {
                that.requestSuccess(res, requestData.opts)
                resolve(res)
            };
            requestConfig.fail = reject;
            wx.request(requestConfig)
        })
    },
    //回调成功
    requestSuccess(res, opts) {
        let data = res.data;
        let pages = getCurrentPages();
        let page = pages[pages.length - 1];
        if (data.code != 0 && data.code != '10003' && !data.toLogin) {
            if (opts && opts.noFailMsg) { }
            else {
                data.msg && page.$showToast(data.msg)
            }
        }
        //重新登录
        if (data.toLogin && !opts.dontNeedReLogin) {
            app.getAccessToken((status) => {
                if(!status) {
                    if(app.globalData.unionId != '') {
                        wx.navigateTo({
                            url: '/pages/personal/bind_phone/index?callbackUrl=back',
                        })
                    }
                    else{
                        wx.navigateTo({
                            url: '/pages/authorization/index?callbackUrl=back',
                        })
                    }
                }
                else {
                    page.onLoad(page.options)
                    setTimeout(() => {
                        page.onShow();
                    }, 0)
                }
            });
        }
        if (res.statusCode == 500) {
            page.$hideLoading();
            page.$showToast(NETWORK_ERROR);
        }
    },
    //上传图片
    uploadFile(tempFilePath, cb) {
        if (!app) {
            app = getApp()
        }
        return new Promise((resolve, reject) => {
            //确定访问域名url
            wx.uploadFile({
                url: host + API.uploadFile,
                filePath: tempFilePath,
                name: 'file',
                header: {
                    'content-type': 'multipart/form-data'
                },
                formData: {
                    'access_token': app.globalData.accessToken,
                    'name': 'file',
                },
                success: (e) => {
                    let data = JSON.parse(e.data);
                    resolve(data)
                },
                fail: (e) => {
                    reject({code: -1})
                },
                complete: (e) => {
                }
            })
        })

    },
}

export default Request;