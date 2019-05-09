const objectUtil = {
    formatParams(params) {
        if (!params) return params

        let res = [];
        for (let key in params) {
            if (typeof params[key] == 'object') {
                if (this.isType(params[key], 'Array')) {
                    for (let i = 0; i < params[key].length; i++) {
                        res.push(key + '[' + i + ']=' + params[key][i]);
                    }
                }
                else {
                    res.push(key + '=' + params[key]);
                }
            }
            else {
                res.push(key + '=' + params[key]);
            }
        }
        return res.join('&');
    },
    isType(obj, type) {
        return Object.prototype.toString.call(obj) == '[object ' + type + ']';
    },
    flatten(obj) {
        var result = {};

        function recurse(src, prop) {
            var toString = Object.prototype.toString;
            if (toString.call(src) == '[object Object]') {
                var isEmpty = true;
                for (var p in src) {
                    isEmpty = false;
                    recurse(src[p], prop ? prop + '.' + p : p)
                }
                if (isEmpty && prop) {
                    result[prop] = {};
                }
            } else if (toString.call(src) == '[object Array]') {
                var len = src.length;
                if (len > 0) {
                    src.forEach(function (item, index) {
                        recurse(item, prop ? prop + '[' + index + ']' : index);
                    })
                } else {
                    result[prop] = [];
                }
            } else {
                result[prop] = src;
            }
        }
        recurse(obj, '');

        return result;
    },
    objQueryToString(obj) {
        let str = '';
        if (obj) {
            let strs = [];
            for (let key in obj) {
                strs.push(key + '=' + obj[key])
            }
            if(strs.length) {
                str += strs.join('&');
            }
        }
        return str
    },
    cloneArray(arr) {
        let len = arr.length,
            arrNew = [];
        for (let i = 0; i < len; i++) {
            arrNew[i] = this.clone(arr[i]);
        }
        return arrNew;
    },
    clone(obj) {
        let _this = this;

        function deepClone(obj) {
            let _obj = {};
            for (let key in obj) {
                if (obj[key] instanceof Array) {
                    _obj[key] = _this.cloneArray(obj[key]);
                    continue;
                }
                if (obj.hasOwnProperty(key) && typeof obj[key] !== 'object') {
                    _obj[key] = obj[key];
                }
                if (obj.hasOwnProperty(key) && typeof obj[key] === 'object') {
                    _obj[key] = deepClone(obj[key]);
                }
            }
            return _obj;
        }
        return deepClone(obj);
    }
}
export default objectUtil;