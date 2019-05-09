Component({
    /**
     * 组件的属性列表
     */
    properties: {
        title: {
            type: String,
            value: '',
        },
        btnText: {
            type: String,
            value: '确定'
        },
        showCloseIcon: {
            type: Boolean,
            value: false,
        },
        showBtn: {
            type: Boolean,
            value: true
        },
        titleBorder: {
            type: Boolean,
            value: false
        },
        className: {
            type: String,
            value: ''
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        visible: false,
    },
    
    attached() {
        const pages = getCurrentPages();
        this.page = pages[pages.length - 1];
    },

    methods: {
        open() {
            this.setData({
                visible: true
            })
        },
        close() {
            this.setData({
                visible: false
            })
        },
        handleConfirm() {
            this.triggerEvent('confirm', { close: this.close.bind(this)})
        }
    }
})
