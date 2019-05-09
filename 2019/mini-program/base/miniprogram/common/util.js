function e(e) {
    return (e = e.toString())[1] ? e : "0" + e;
}

// 将日期时间转时间戳
function transTimeToTimeStamp(dateStr) {
    var thisTime = dateStr.replace(/-/g, '/');
    var time = new Date(thisTime);
    time = time.getTime() / 1000;
    // console.log('time' +time)
    return time
}

// 将数字月份转换成文字显示
function transMathMonth(month) {
    var chineseNumeralsArray = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
    return chineseNumeralsArray[month - 1];
}

module.exports = {
    formatTime: function(t) {
        var n = t.getFullYear(),
            r = t.getMonth() + 1,
            g = t.getDate(),
            o = t.getHours(),
            s = t.getMinutes(),
            u = t.getSeconds();
        return [n, r, g].map(e).join("/") + " " + [o, s, u].map(e).join(":");
    },
    formatDateTime: function(e, t) {
        var n = {
            "M+": e.getMonth() + 1,
            "d+": e.getDate(),
            "h+": e.getHours(),
            "m+": e.getMinutes(),
            "s+": e.getSeconds(),
            "q+": Math.floor((e.getMonth() + 3) / 3),
            "S+": e.getMilliseconds()
        };
        /(y+)/i.test(t) && (t = t.replace(RegExp.$1, (e.getFullYear() + "").substr(4 - RegExp.$1.length)));
        for (var r in n) new RegExp("(" + r + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? n[r] : ("00" + n[r]).substr(("" + n[r]).length)));
        return t;
    },
    sortRecordAddTimeWithLists: function(timeLists) {
        if (timeLists.length <= 0) {
            return;
        }
        // 排序
        // console.log(timeLists)
        var sortArray = timeLists.sort((a, b) => {
            var addTime1 = transTimeToTimeStamp(a.add_time);
            var addTime2 = transTimeToTimeStamp(b.add_time);
            if (a.add_time > b.add_time) {
                return -1;
            } else if (a.add_time < b.add_time) {
                return 1;
            } else {
                return 0;
            }
        })
        // console.log( sortArray)

        // 分组
        var totalArray = [];
        var tempArray = [];

        sortArray.forEach((item, index) => {
            if (index == 0) {
                tempArray.push(item)
            }
            var nextObj;
            if (index !== sortArray.length - 1) {
                nextObj = sortArray[index + 1]
            } else {
                nextObj = {}
            }

            var frontTimeArray = item.add_time.split('-')

            var latterTimeArray = []
            if (nextObj.add_time != undefined) {
                latterTimeArray = nextObj.add_time.split('-')
            }

            var frontMonthStr = frontTimeArray[0].concat('-').concat(frontTimeArray[1])
            var latterMonthStr = undefined;
            if (latterTimeArray.length > 0) {
                latterMonthStr = latterTimeArray[0].concat('-').concat(latterTimeArray[1]);
            }

            item.show_Time = frontTimeArray[1].concat('-').concat(frontTimeArray[2])

            // if (latterTimeArray.length <= 0){
            //   console.log('没有找到');
            //   return;
            // }

            if (frontMonthStr === latterMonthStr) {
                tempArray.push(nextObj)
            } else {
                totalArray.push(tempArray)
                tempArray = []
                tempArray.push(nextObj)
            }
        })


        var dataLists = []
        if (totalArray.length <= 1) {
            var currentModel = totalArray[0][0]
            var model = {}

            var frontTimeArray = currentModel.add_time.split('-')
            var timeYearMonth = frontTimeArray[0].concat('-').concat(frontTimeArray[1])
            // 当前时间
            var nowDate = new Date()
            var currentYearStr = nowDate.getFullYear();
            var currentMonthStr = nowDate.getMonth() + 1;

            var currentYearOrMonthStr = currentYearStr + '-' + currentMonthStr

            if (currentYearOrMonthStr === timeYearMonth) {
                model.title = "本月";
            } else if (currentYearStr === frontTimeArray[0]) {
                // 是同年
                model.title = transMathMonth(frontTimeArray[1]);
            } else {
                model.title = timeYearMonth
            }

            model.lists = totalArray[0]
            dataLists.push(model)

        } else {

            totalArray.forEach((item, index) => {
                var currentModel = item[0]
                if (currentModel) {
                    var model = {}

                    var frontTimeArray = currentModel.add_time.split('-')
                    var timeYearMonth = frontTimeArray[0].concat('-').concat(frontTimeArray[1])
                    // 当前时间
                    var nowDate = new Date()
                    var currentYearStr = nowDate.getFullYear();
                    var currentMonthStr = nowDate.getMonth() + 1;

                    var currentYearOrMonthStr = currentYearStr + '-' + currentMonthStr

                    if (currentYearOrMonthStr === timeYearMonth) {
                        model.title = "本月";
                    } else if (currentYearStr === frontTimeArray[0]) {
                        // 是同年
                        model.title = transMathMonth(frontTimeArray[1]);
                    } else {
                        model.title = timeYearMonth
                    }

                    model.lists = item
                    dataLists.push(model)
                }
            })
        }


        // console.log('datalists ' + dataLists[0]);

        return dataLists
    },
    calcTime(time) {
        let day = parseInt(time / 60 / 60 / 24),
            hours = 0,
            minute = 0,
            second = 0;

        hours = day > 0 ? parseInt((time - day * 24 * 60 * 60) / 60 / 60) : parseInt(time / 60 / 60);
        minute = day > 0 ? parseInt((time - day * 24 * 60 * 60 - hours * 60 * 60) / 60) : parseInt((time - hours * 60 * 60) / 60);
        second = day > 0 ? time - day * 24 * 60 * 60 - hours * 60 * 60 - minute * 60 : time - hours * 60 * 60 - minute * 60;

        let timeObj = {
            day: fixNumber(day),
            hours: fixNumber(hours),
            minute: fixNumber(minute),
            second: fixNumber(second)
        }

        function fixNumber(n) {
            return n < 10 ? '0' + n : n
        }
        return timeObj
    },
    timeObjToTimeStr(timeObj, formate = 'HH时MM分SS秒') {
        let str = '';
        if (timeObj.day > 0) {
            str = timeObj.day + '天' + timeObj.hours + '时' + timeObj.minute + '分';
        } else {
            formate = formate.replace('HH', timeObj.hours);
            formate = formate.replace('MM', timeObj.minute);
            formate = formate.replace('SS', timeObj.second);
            str = formate;
        }
        return str;
    },
    timerSleep(id, remainTime) {

    },
    getUrlParam(url) {
        let res = {};
        let params = url.split('?')[1];
        if(params) {
            let paramsList = params.split('&');
            paramsList.forEach(item => {
                let obj = item.split('=');
                res[obj[0]] = obj[1]
            })
        }
        return res;
    },
    // 跳转链接，
    redirectUrl(url = '/pages/index/index') {
        url = decodeURIComponent(url);
        if (url == 'back') {
            wx.navigateBack()
            return false;
        }
        let switchUrls = ['/pages/index/index', '/pages/category/index', '/pages/shopcart/tab_shopcart', '/pages/personal/index'];
        let isSwitchTab = false;
        switchUrls.forEach(item => {
            if (url.indexOf(item) >= 0) {
                isSwitchTab = true
            }
        })
        console.log(url)
        url = url.replace('//', '/');

        if (isSwitchTab) {
            let params = this.getUrlParam(url);
            wx.setStorageSync('urlParams', params);
            url = url.split('?')[0];
            wx.switchTab({
                url
            })
        } else {
            wx.redirectTo({
                url
            })
        }
    },
    toGoodsDetail(id, goodsThumb = '') {
        wx.setStorageSync('goodsThumb', goodsThumb)
        wx.navigateTo({
            url: '/pages/goods/detail/index?id=' + id,
        })
    },
};