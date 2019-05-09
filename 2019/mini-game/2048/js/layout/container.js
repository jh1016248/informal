import canvasApis from '../canvas_apis'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const CONTAINER_WIDTH = screenWidth - 40
const CONTAINER_HEIGHT = CONTAINER_WIDTH
const ITEM_WIDTH = (CONTAINER_WIDTH - 50) / 4
const ITEM_HEIGHT = (CONTAINER_WIDTH - 50) / 4
const CONTAINER_LEFT = 20
const CONTAINER_TOP = screenHeight - CONTAINER_HEIGHT - 200

export default class Container {
    constructor(ctx) {
        this.ctx = ctx
        this.top = screenHeight - CONTAINER_HEIGHT - 200
        this.touchIng = false
        this.listMap = []
        this.drawContainer()
        this.resetGame()
        this.initEvent()
    }

    drawContainer() {
        canvasApis.fillRoundRect(this.ctx, CONTAINER_LEFT, CONTAINER_TOP, CONTAINER_WIDTH, CONTAINER_HEIGHT, 5, '#bbada0')
    }

    resetGame() {
        this.initListMap()
    }

    initEvent() {
        let startX = 0, startY = 0, endX = 0, endY = 0
        canvas.addEventListener('touchstart', e => {
            let { clientX, clientY } = e.touches[0]
            if (clientX >= CONTAINER_LEFT && clientX <= CONTAINER_LEFT + CONTAINER_WIDTH
                && clientY >= CONTAINER_TOP && clientY <= CONTAINER_TOP + CONTAINER_HEIGHT) {
                    startX = endX =  clientX
                    startY = endY =  clientY
                this.touchIng = true
            }
        })
        canvas.addEventListener('touchmove', e => {
            let { clientX, clientY } = e.touches[0]
            if(this.touchIng) {
                endX = clientX
                endY = clientY
            }
        })
        canvas.addEventListener('touchend', e => {
            if(this.touchIng) {
                let absX = endX - startX,
                    absY = endY - startY
                if(Math.abs(absX) > Math.abs(absY)) {
                    //左右滑动
                    this.checkBox(absX > 0 ? 2 : 4)
                }
                else{
                    //上下滑动
                    this.checkBox(absY > 0 ? 3 : 1)
                }
            }
            startX = endX = 0
            startY = endY = 0
            this.touchIng = false
        })
    }

    initListMap() {
        let list = [
            [0,4,2,0],
            [0,4,4,8],
            [0,0,0,2],
            [0,0,8,0]
        ]
        this.listMap = list
        this.drawList()
    }

    drawList() {
        let list = this.listMap
        for(let i = 0; i < list.length; i++) {
            for(let j = 0; j < list[i].length; j++) {
                this.drawItem(list[i][j], i, j)
            }
        }
    }

    drawItem(item, i, j) {
        let left = ITEM_WIDTH * j + 10 * (j + 1) + CONTAINER_LEFT,
            top = ITEM_HEIGHT * i + 10 * (i + 1) + CONTAINER_TOP
        canvasApis.fillRoundRect(this.ctx, left, top, ITEM_WIDTH, ITEM_HEIGHT, 10, '#cdc1b4')
        if (item > 0) {
            this.ctx.textAlign = 'center'
            this.ctx.font = '30px STheiti, SimHei'
            this.ctx.fillStyle = "#776e65"
            this.ctx.fillText(item, left + ITEM_WIDTH / 2, top + ITEM_HEIGHT / 2 + 10, ITEM_WIDTH)
        }
    } 

    checkBox(type) {
        //1：上，2：右，3：下，4：左
        let list = this.listMap


        switch(type) {
            case 1:
                
                break;
            case 2:
                for (let i = 0; i < list.length; i++) {
                    for (let j = 0; j < list[i].length; j++) {
                        merge(i, j, type)
                    }
                    for (let j = 0; j < list[i].length; j++) {
                        checkPrevList(i, j)
                    }
                }
                break;
            case 3: 
                
                break;

            case 4: 
                for (let i = 0; i < list.length; i++) {
                    for (let j = 0; j < list[i].length; j++) {
                        merge(i, j, type)
                    }
                    for (let j = 0; j < list[i].length; j++) {
                        checkPrevList(i, j)
                    }
                }
                break;
        }

        this.drawList()


        function merge(i, j, dirc) {
            if(dirc == 'left') {
                if (list[i][j] != 0) {
                    for (let k = j + 1; k < list[i].length; k++) {
                        if(list[i][j] == 0) {
                            continue
                        }
                        if(list[i][k] != 0 && list[i][k] != list[i][j]) {
                            //24xx 这种情况 不换而且直接break
                            break
                        }
                        if(list[i][k] != 0 && list[i][k] == list[i][j]) {
                            list[i][j] = list[i][j] * 2
                            list[i][k] = 0
                            break
                        }
                    }
                }
            }
        }

        function checkPrevList(i, j) {
            if(list[i][j] == 0) return 
            for(let k = 0; k < j; k++) {
                if (list[i][k] == 0) {
                    list[i][k] = list[i][j]
                    list[i][j] = 0
                    break
                }
            }
        }
    }

    addItem() {
        let list = this.listMap
        let random = Math.floor(Math.random() * 16)

    }

    drawText() {

    }

    getFontColor(item) {
        
    }

}