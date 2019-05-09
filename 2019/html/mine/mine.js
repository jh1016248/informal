(function (win) {
    const PANE_SIZE = 16
    let canvas = document.querySelector("#mine-canvas"),
        ctx = canvas.getContext('2d')
    let blankEl = 'images/blank.bmp',
        flagEl = 'images/flag.bmp',
        mineEl = 'images/mine.bmp',
        bloodEl = 'images/blood.bmp';


    class Mine {
        constructor( paneWidth, paneHeight, mineCount) {
            this.resetGame(paneWidth, paneHeight, mineCount)
        }

        resetGame(paneWidth, paneHeight, mineCount) {
            canvas.width = paneWidth * PANE_SIZE
            canvas.height = paneHeight * PANE_SIZE
            document.querySelector(".window-wrap").style.width = canvas.width + 15
            document.querySelector(".window-wrap").style.height = canvas.height + 60
            this.paneHeight = paneHeight
            this.paneWidth = paneWidth
            this.mineCount = mineCount
            this.listMap = {}
            this.victory = false
            this.gameOver = false
            this.successList = [] //插旗子对了几个
            this.flagList = [] //旗子列表
            this.prevHoverItem = '' //上一个hover元素
            this.resetMap()
            this.initEvent()
        }

        initEvent() {
            canvas.onmousemove = (e) => {
                if(this.gameOver) return false
                let itemMap = this.getCellItem(e)
                this.clearPrevHoverItem(itemMap)
                this.prevHoverItem = itemMap
                if (this.listMap[itemMap] && this.listMap[itemMap].cover) {
                    this.listMap[itemMap].hover = true
                    this.drawItem(this.listMap[itemMap], itemMap)
                }
            }

            canvas.onmouseleave = this.clearPrevHoverItem.bind(this)

            canvas.onmousedown = e => {
                if(e.button != 0) {
                    return false
                }
                let itemMap = this.getCellItem(e)
                let item = this.listMap[itemMap]
                if (item && (!item.cover || item.flag)) {
                    return false
                }
                if (item.isBoom) {
                    item.isBlood = true
                    this.startGameOver()
                }
                else {
                    this.checkAround(item, itemMap, true)
                }
            }

            document.oncontextmenu = e => {
                var e = event || window.event;
                let itemMap = this.getCellItem(e)
                let item = this.listMap[itemMap]
                if(!item.cover) {
                    return false
                }
                if(this.flagList.length >= this.mineCount && !item.flag) {
                    return false
                }
                item.flag = !item.flag
                if(item.flag) {
                    if(this.flagList.indexOf(itemMap) < 0) {
                        this.flagList.push(itemMap)
                    }
                }
                else{
                    this.flagList.splice(this.flagList.indexOf(itemMap), 1)
                }
                if(item.flag && item.isBoom) {
                    this.successList.push(itemMap)
                }
                if(!item.flag) {
                    if(this.successList.indexOf(itemMap) >= 0) {
                        this.successList.splice(this.successList.indexOf(itemMap), 1)
                    }
                }
                if(this.successList.length == this.mineCount) {
                    this.victoryGame()
                }
                else{
                    this.drawItem(item, itemMap)
                }
                return false;
            }
        }

        victoryGame() {
            this.victoryGame = true
            this.drawCanvas()
            console.log('胜利')
        }

        //检查当前格子周围有多少个炸弹
        checkAround(item, itemMap, checkOther = false) {
            if (item.isBoom) {
                return item
            }
            let listMap = this.listMap
            let mapArr = itemMap.split('.'),
                mapX = parseInt(mapArr[0]),
                mapY = parseInt(mapArr[1]),
                boomCount = 0
            let checkArr = {
                topLeft: (mapX - 1) + '.' + (mapY - 1),
                topCenter: (mapX + '.' + (mapY - 1)),
                topRight: (mapX + 1) + '.' + (mapY - 1),
                left: (mapX - 1) + '.' + mapY,
                right: (mapX + 1) + '.' + mapY,
                bottomLeft: (mapX - 1) + '.' + (mapY + 1),
                bottomCenter: mapX + '.' + (mapY + 1),
                bottomRight: (mapX + 1) + '.' + (mapY + 1)
            }
            if (checkOther) {
                item.cover = false
                this.drawItem(item, itemMap)
                if (item.number == 0) {
                    for (let key in checkArr) {
                        let nowItem = listMap[checkArr[key]]
                        if (nowItem && nowItem.cover) {
                            this.checkAround(nowItem, checkArr[key], true)
                        }
                    }
                }
            }
            else {
                for (let key in checkArr) {
                    let nowItem = listMap[checkArr[key]]
                    if (nowItem && nowItem.isBoom) {
                        boomCount++
                    }
                }
                item.number = boomCount
                return item
            }
        }

        //游戏结束
        startGameOver() {
            this.gameOver = true
            console.log('gameOver')
            this.drawCanvas()
        }

        //清除上一个鼠标移过格子
        clearPrevHoverItem(nowItemMap = '') {
            let prevHoverItem = this.prevHoverItem
            if (nowItemMap != '' && nowItemMap == prevHoverItem) {
                return
            }
            if (prevHoverItem != '' && this.listMap[prevHoverItem] && this.listMap[prevHoverItem].cover) {
                this.listMap[prevHoverItem].hover = false
                this.drawItem(this.listMap[prevHoverItem], prevHoverItem)
            }
        }

        //获取鼠标下面是哪个格子
        getCellItem(e) {
            let itemY = parseInt(e.offsetY / PANE_SIZE),
                itemX = parseInt(e.offsetX / PANE_SIZE)
            return itemX + '.' + itemY
        }

        //重新设置数组
        resetMap() {
            let listMap = {},
                index = 0
            for (let i = 0; i < this.paneWidth; i++) {
                for (let j = 0; j < this.paneHeight; j++) {
                    listMap[i + '.' + j] = {
                        isBoom: false, //是炸弹
                        cover: true, //盖着的
                        number: 0, //数值
                        flag: false, //标记为旗子
                        index: index,
                        isBlood: false, //就是点了这个炸弹死的
                    }
                    index++
                }
            }
            this.listMap = listMap
            this.createBoom()
        }

        //随机生成炸弹
        createBoom() {
            let listMap = this.listMap
            let boomList = []
            let length = this.mineCount
            for (let i = 0; i < length; i++) {
                let random = Math.floor(Math.random() * this.paneWidth * this.paneHeight)
                if (boomList.indexOf(random) >= 0) {
                    length++
                }
                else {
                    boomList.push(random)
                }
            }

            for (let map in listMap) {
                if (boomList.indexOf(listMap[map].index) >= 0) {
                    listMap[map].isBoom = true
                    listMap[map].number = ''
                }
            }
            for (let key in listMap) {
                listMap[key] = this.checkAround(listMap[key], key)
            }
            console.log(listMap)
            this.drawCanvas()
        }

        //画到画布
        drawCanvas() {
            let listMap = this.listMap
            for (let i in listMap) {
                this.drawItem(listMap[i], i)
            }
        }

        drawItem(item, itemMap) {
            if (this.gameOver || this.victory) {
                item.cover = false
            }
            if ((item.number != '' || item.number === 0) && !item.cover) {
                this.drawNumCell(item, itemMap)
            }
            if ((item.number == '' && item.number !== 0) || item.cover || item.flag) {
                this.drawCell(item, itemMap)
            }
        }

        drawCell(item, itemMap) {
            let mapArr = itemMap.split('.')
            let imgSrc = blankEl
            let img = new Image()

            if (this.gameOver) {
                if (item.isBoom) {
                    imgSrc = mineEl
                }
                if (item.isBlood) {
                    imgSrc = bloodEl
                }
            }
            else {
                if (item.cover) {
                    imgSrc = blankEl
                }
                if (item.hover && item.cover) {
                    imgSrc = 'images/0.bmp'
                }
                if (item.flag) {
                    imgSrc = flagEl
                }
            }
            img.src = imgSrc
            img.onload = function () {
                ctx.drawImage(img, mapArr[0] * PANE_SIZE, mapArr[1] * PANE_SIZE, PANE_SIZE, PANE_SIZE)
            }
        }

        drawNumCell(item, itemMap) {
            let mapArr = itemMap.split('.')
            let img = new Image()
            if((this.gameOver || this.victoryGame) && item.flag) {
                img.src = 'images/error.bmp'
            }
            else{
                img.src = 'images/' + item.number + '.bmp'
            }
            img.onload = function () {
                ctx.drawImage(img, mapArr[0] * PANE_SIZE, mapArr[1] * PANE_SIZE, PANE_SIZE, PANE_SIZE)
            }
        }

    }

    let mineGame = new Mine(16, 16, 40)
    function $(el) {
        return document.querySelector(el)
    }
    let page = {
        init() {
            this.leave = 1
            this.width = 0
            this.height = 0
            this.mineCount = 0
            this.initEvent()
        },
        resetGame() {
            const leaves = {
                "0": [9,9,10],
                "1": [16,16,40],
                "2": [30,16,99]
            }
            let leave = this.leave
            if(leave == 3) {
                mineGame.resetGame(this.width, this.height, this.mineCount)
            }
            else {
                mineGame.resetGame(leaves[leave][0], leaves[leave][1], leaves[leave][2])
            }
        },
        initEvent() {
            let that = this
            let gameMenu = $(".menu-game"),
                gameLeaveWrap = $(".game-leave"),
                resetBtn = $(".reset-btn"),
                modal = $(".modal")

            gameMenu.onclick = function (e) {
                e.stopPropagation()
                gameLeaveWrap.classList.add('active')
            }

            resetBtn.onclick = function() {
                that.resetGame()
            }

            gameLeaveWrap.onclick = function(e) {
                e.stopPropagation()
                let leave = e.target.getAttribute('data-leave')
                this.querySelectorAll('li').forEach(item => {
                    item.classList.remove('active')
                })
                e.target.classList.add('active')
                gameLeaveWrap.classList.remove('active')
                that.leave = leave
                if(leave == 3) {
                    $(".modal").classList.add('active')
                }
                else{
                    that.resetGame()
                }
            }

            $("#btnConfirm").onclick = function (e) {
                e.stopPropagation()
                let width = $("#row").value || 0,
                    height = $("#column").value || 0,
                    mineCount = $("#mineCount").value || 0
                
                if(width != 0 && height != 0 && mineCount != 0) {
                    that.width = width
                    that.height = height
                    that.mineCount = mineCount
                    $(".modal").classList.remove('active')
                    that.resetGame.call(that)
                }


            }

            document.body.onclick = function () {
                gameLeaveWrap.classList.remove('active')
            }
        }
    }
    page.init()
})(window)