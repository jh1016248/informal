import { deflateRaw } from "zlib";

class Game{
    constructor(main) {
        const g = {
            main: main,
            canvas: document.querySelector('#canvas'),
            context: document.querySelector('#canvas').getContext('2d'),
            state: 1,   // 游戏状态值，初始默认为1
            GAME_START: 1, 
            GAME_RUNNING: 2,
            GAME_STOP: 3,
            GAME_OVER: 4,
            timer: null,

        };
        Object.assign(this, g);
    }

    init() {

        this.setTimer()
    }

    setTimer(ball) {
        this.timer = setInterval(() => {
            ball.move();
            draw(ball)
        }, 1000 / 60)
    }

    resetGame() {
                
    }
}