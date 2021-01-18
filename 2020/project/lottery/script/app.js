var fs = parseFloat(document.documentElement.style.fontSize)
var host = 'https://mooning.mooning.vip/api/activity';

$.ajax({
    url: 'http://auto-order-test.gzzyad.com/api/v1/order/getbuyerorderlist',
    success: function () {
        
    },
})
var animIndex = 0;
var vm = new Vue({
    el: '#app',
    data: {
        navIndex: 1,
        showInputCardModal: false,
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
        msg: '',
        isShowMsg: false,
        needStart:false,
    },
    computed: {
        prizeName: function () {
            var id = this.prizeInfo.batch_id;
            if(!id) return '';
            return this.prizeInfo.prize_name;
        }
    },
    methods: {
        showMsg: function (msg) {
            this.msg = msg;
            var that = this;
            that.isShowMsg =  true
            setTimeout(function () {
                that.isShowMsg = false;
            }, 2000)
        },
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
                    that.prizeList = res.data
                }
            })
        },  
        validCard: function() {
            if(this.cardNo === '') {
                this.showMsg('请输入抽奖验证码')
                this.$refs.cardNoInput.focus();
                return
            }
            var that = this;
            localStorage.cardNo = this.cardNo
            this.showInputCardModal = false;
            setTimeout(function () {
                that.lottery();
            }, 200)
        },
        start: function () {
            if(this.loading) return 
            this.showInputCardModal = true;
        },
        lottery: function () {
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
                        var rotate = 3960 - end * 40;
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
                            }, 5300)
                        }
                        else {
                            that.showPrizeModal = true;
                        }
                    }
                    else {
                        that.showMsg(res.msg)
                        setTimeout(function () {
                            that.showInputCardModal = true;
                        })
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
            if(username == '') {
                this.showMsg('请输入名称');
                this.$refs.usernameInput.focus();
                return 
            }
            if(mobile == '') {
                this.showMsg('请输入电话');
                this.$refs.mobileInput.focus();
                return 
            }
            if(address == '') {
                this.showMsg('请输入地址');
                this.$refs.addressInput.focus();
                return 
            }
            this.submit()
        },
        submit: function() {
            var that = this;
            if(this.loading) return 
            this.loading = true
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
                    that.loading = false;
                    if(res.code == 1) {
                        that.showPrizeModal = false;
                        setTimeout(function () {
                            that.showSuccessModal = true
                        }, 300)
                    }
                },
                error: function () {
                    that.loading = false;
                }
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
        if(localStorage.cardNo !== '') {
            this.cardNo = localStorage.cardNo
        }
        this.getLotteryList();
        this.getprizelist();
        var that = this;
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