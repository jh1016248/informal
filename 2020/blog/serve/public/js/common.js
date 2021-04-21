function fn(method, url, data) {
    return new Promise((resolve, reject) => {
        $.ajax({
            method,
            url: 'http://localhost:3030' + url,
            data,
            headers: {
                Authorization: localStorage.token
            },
            success(res) {
                resolve(res)
            },
            error(e) {
                reject(e)
            }
        })
    })
}
const request = {
    post(url, data = {}) {
        return fn('post', url, data)
    },
    get(url, data = {}) {
        return fn('get', url, data)
    }
}