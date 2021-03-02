const host = 'http://172.168.11.89:9000'
export const apis = {
	login: host + '/wx/user/login',
	userInfo: host + '/wx/user/info',
	userPhone: host + '/wx/user/phone',
	productColorList: host + '/productColor/selectByPage',
	h5Login: host + '/login',
	register: host + '/user/save',
	indent: host + '/indent',
	isExist: host + '/indent/isExist',
	getIndent: host + '/indent/getByToken',
	uploadFiles: host + '/uploadFiles',
}
function request(type, url, data, options = {}) {
	return new Promise((resolve, reject) => {
		uni.request({
		    url: url, //仅为示例，并非真实接口地址。
		    data: data,
			method: type,
		    header: {
				token: uni.getStorageSync('token'),
			},
		    success: (res) => {
		        console.log(res.data);
				resolve(res.data)
		    },
			fail: e => {
				reject(e)
			},
			complete: e => {
				if(e.statusCode == 401) {
					uni.setStorageSync('token', '')
					reject(e)
				}
			}
		});
	})
}
export default {
	post(url, data, options) {
		return request('post', url, data, options)
	},
	get(url, params, options) {
		if(params) {
			let p = []
			Object.entries(params).map(([k, v]) => {
				p.push(`${k}=${v}`)
			})
			url += `?${p.join('&')}`
		}
		return request('get', url, {}, options)
	},
}