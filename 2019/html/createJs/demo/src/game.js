class Game{
    constructor(main) {
        const g = {
            main,
            state: 1,   // 游戏状态值，初始默认为1
            GAME_START: 1, 
            GAME_RUNNING: 2,
            GAME_STOP: 3,
            GAME_OVER: 4,
            timer: null,
            actions: [],
            keydowns: {},
        };
        Object.assign(this, g);
    }

    init() {
        const { ball, paddle } = this.main;
        this.addEvent();
        this.setTimer(ball);
    }

    setTimer(ball) {
        this.timer = setInterval(() => {
            const actions = this.actions;
            Object.keys(actions).forEach(action => {
                if(action && this.keydowns[action]) {
                    actions[action]();
                }
            })
            if(this.isRunning()) {
                ball.move();
            }
            this.main.stage.update(); 
        }, 1000 / 60)
    }

    addEvent() {
        const { paddle } = this.main;
        window.addEventListener('keydown', e => {
            this.keydowns[e.keyCode] = true
        });

        window.addEventListener('keyup', e => {
            this.keydowns[e.keyCode] = false
        })

        //注册板子右移事件
        this.on(39, () => {
            if(this.state === this.GAME_RUNNING) {
                paddle.moveRight();
            }
        })
        //注册板子右移事件
        this.on(37, () => {
            if(this.state === this.GAME_RUNNING) {
                paddle.moveLeft();
            }
        })

        //注册开始暂停事件
        window.addEventListener('keydown', e => {
            switch(e.keyCode) {
                case 32:
                    this.state = this.GAME_RUNNING;
                    break;
            }
        })
    }

    on(handle, func) {
        this.actions[handle] = func;
    }

    emit(handle, props) {
        typeof this.actions[handle] === 'function' && this.actions[handle](props);
    }

    off(handle) {
        this.actions[handle] = null;
    }

    isRunning() {
        return this.state === this.GAME_RUNNING;
    }

    isOver() {
        return this.state === this.GAME_OVER;
    }

    isStop() {
        return this.state === this.GAME_STOP;
    }

    resetGame() {
    
    }
}