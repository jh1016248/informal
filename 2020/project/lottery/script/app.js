var fs = parseFloat(document.documentElement.style.fontSize)
var host = 'https://mooning.mooning.vip/api/activity';
// ejlAS
// 8uU0w
// fPGTS
// qwePd
// 8vE0w
// rrtaL
// DDY53
// 9ughu
// %2BAGhw
// vs7Rk
// vs7Vk
// ROJK0
// %2B-Juw
// mpqrV
// ugnnh
// dZpmM
// DC7W3
var animIndex = 0;
var vm = new Vue({
    el: '#app',
    data: {
        navIndex: 1,
        showInputCardModal: true,
        showSuccessModal: false,
        showPrizeModal: false,
        prizeList: [],
        nameList: [],
        offsetH: 0,
        listStyle: {},
        cardNo: '',
        sizeForm: {
            user_name: '',
            mobile: '',
            address: '',
        },
        submitInfoed: false,
        prizeInfo: {},
    },
    methods: {
        getLotteryList: function () {
            var that = this;
            $.ajax({
                url: host + '/getLotteryList',
                type: 'post',
                success: function (res) {
                    that.nameList = res.data;
                    if(res.data.length > 3) {
                        that.startTimer();
                    }
                }
            })
        },
        getprizelist: function () {
            var that = this;
            $.ajax({
                url: host + '/getprizelist',
                type: 'post',
                success: function (res) {
                    that.prizeList = res.data.concat(res.data).concat(res.data);
                }
            })
        },  
        validCard: function() {
            if(this.cardNo === '') {
                return
            }
            localStorage.cardNo = this.cardNo
            this.showInputCardModal = false;
        },
        start: function () {
            if(this.loading) return 
            if(!this.cardNo) {
                this.showInputCardModal = true;
                return 
            }
            this.loading = true;
            var that = this;
            $.ajax({
                url: host + '/adduserlottery',
                type: 'post',
                data: {
                    lottery_code: this.cardNo,
                },
                success: function (res) {
                    that.loading = false;
                    if(res.code == 1) {
                        var end = 0;
                        for(var i = 0; i < that.prizeList.length; i++) {
                            if(that.prizeList[i].batch_id === res.data.batch_id) {
                                end = i;
                            }
                        }
                        var rotate = 3960 - end * 60 + 30;
                        var userInfo = res.data.user_info
                        that.prizeInfo = res.data;
                        if(userInfo.user_name) {
                            that.submitInfoed = true;
                            that.sizeForm = userInfo
                        }
                        else {
                            that.submitInfoed = false;
                        }
                        if(that.prizeInfo.is_lottery == 0) {
                            $(".lottery-box").css('transform', 'rotate(' + rotate + 'deg)')
                            setTimeout(function () {
                                that.showPrizeModal = true;
                            }, 3300)
                        }
                        else {
                            that.showPrizeModal = true;
                        }
                    }
                },
                error: function () {
                    that.loading = false;
                }
            })
        },
        handleSubmit: function() {
            var username = this.sizeForm.user_name;
            var address = this.sizeForm.address;
            var mobile = this.sizeForm.mobile;
            if(mobile !='' && address != '' && username != '') {
                this.submit()
            }
            else {
                // 
            }
        },
        submit: function() {
            var that = this;
            $.ajax({
                url: host + '/adduseraddressandmobile',
                type: 'post',
                data: {
                    lottery_code: this.cardNo,
                    address: this.sizeForm.address,
                    mobile: this.sizeForm.mobile,
                    user_name: this.sizeForm.user_name,
                },
                success: function (res){
                    if(res.code == 1) {
                        that.showPrizeModal = false;
                        setTimeout(function () {
                            that.showSuccessModal = true
                        }, 300)
                    }
                },
            })
        },
        handleNav: function (index) {
            this.navIndex = index;
            this.mySwiper.slideTo(index)
        },
        startTimer: function () {
            var that = this;
            this.timer = requestAnimationFrame(anim)
            
            function anim() {
                that.offsetH += 0.1;
                if(that.offsetH >= that.nameList.length * fs * 0.8) {
                    that.offsetH = 0.3
                }
                that.listStyle = {
                    'transform': 'translateY(-'+ that.offsetH +'px)',
                    '-webkit-transform': 'translateY(-'+ that.offsetH +'px)',
                }
                requestAnimationFrame(anim)
            }
        },
    },
    mounted: function() {
        localStorage.cardNo = '8uU0w'
        if(localStorage.cardNo !== '') {
            this.cardNo = localStorage.cardNo
            // this.showInputCardModal = false;
        }
        this.getLotteryList();
        this.getprizelist();
        var that = this;
        this.startTimer();
        this.$nextTick(function () {
            that.mySwiper = new Swiper('.swiper-container', {
                loop: true,
                onSlideChangeEnd:function (swiper) {
                    that.navIndex = swiper.realIndex + 1;
                },
            })
        })
    }
})