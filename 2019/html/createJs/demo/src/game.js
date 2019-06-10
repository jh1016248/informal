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
            isPaddleRight: true,
            isPaddleLeft: true,
        };
        Object.assign(this, g);
    }

    init() {
        this.addEvent();
        this.setTimer();
    }

    setTimer() {
        this.timer = setInterval(() => {
            const actions = this.actions;
            Object.keys(actions).forEach(action => {
                if(action && this.keydowns[action]) {
                    actions[action]();
                }
            })
            if(this.isOver()) {
                console.log('game over')
            }
            if(this.isRunning()) {
                this.checkBallBlock()
            }
            this.main.stage.update(); 
        }, 1000 / 60)
    }

    checkBallBlock() {
        const { ball, paddle, scene} = this.main;
        
        if(paddle.collide(ball)) {
            ball.speedY *= -1;
            ball.speedX = paddle.collideRange(ball);
        };

        if(paddle.paddle.x <= 0) {
            this.isPaddleLeft = false;
        }
        else {
            this.isPaddleLeft = true;
        }
        if(paddle.paddle.x + paddle.w >= 1000) {
            this.isPaddleRight = false;0
        }
        else {
            this.isPaddleRight = true;
        }
        ball.move(this);
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
            if(this.state === this.GAME_RUNNING && this.isPaddleRight) {
                paddle.moveRight();
            }
        })
        //注册板子左移事件
        this.on(37, () => {
            if(this.state === this.GAME_RUNNING && this.isPaddleLeft) {
                paddle.moveLeft();
            }
        })

        //注册开始暂停事件
        window.addEventListener('keydown', e => {
            switch(e.keyCode) {
                case 32:
                    if(this.isStart()) {
                        this.state = this.GAME_RUNNING;
                    }
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

    isStart() {
        return this.state === this.GAME_START;
    }

    isStop() {
        return this.state === this.GAME_STOP;
    }

    resetGame() {
    
    }
}