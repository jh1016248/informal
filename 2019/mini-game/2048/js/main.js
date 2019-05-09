let ctx = canvas.getContext('2d')
import Container from './layout/container'

/**
 * 游戏主函数
 */
export default class Main {
    constructor() {
        // 维护当前requestAnimationFrame的id
        ctx.fillStyle = '#fff'
        ctx.fillRect(0,0,canvas.width, canvas.height)
        this.container = new Container(ctx)
    }

}