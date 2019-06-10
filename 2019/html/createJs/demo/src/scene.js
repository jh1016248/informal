
class Ball{
    constructor(main) {
        const b = {
            main,
            width: 18, 
            height: 18,
            x: main.ball_x,
            y: main.ball_y,
            speedX: 1,
            speedY: 5,
            image: imageFromPath(allImage.ball),
            ball: null,
        };
        Object.assign(this, b);
        this.init()
    }
    init() {
        const ball = new createjs.Bitmap(this.image);
        ball.x = this.x;
        ball.y = this.y;
        ball.width = this.width;
        ball.height = this.height;
        this.ball = ball;
        this.main.stage.addChild(this.ball);
    }
    move(game) {
        const { x, y, width, } = this.ball;
        if(x <= 0 || x + width >= 1000) {
            this.speedX *= -1;
        }
        if(y <= 0) {
            this.speedY *= -1;
        }
        if(y >= 500 - this.height) {
            game.state = game.GAME_OVER;
        }
        this.ball.x -= this.speedX;
        this.ball.y -= this.speedY;
    }
}

class Paddle{
    constructor(main) {
        const p = {
            main,
            paddle: null,
            x: main.paddle_x,
            y: main.paddle_y,
            width: 102,
            height: 22,
            speed: 10,
            ballSpeedMax: 8,
            image: imageFromPath(allImage.paddle),
        }
        Object.assign(this, p);
        this.init()
    }
    init() {
        const paddle = new createjs.Bitmap(this.image);
        paddle.x = this.x;
        paddle.y = this.y;
        paddle.width = this.width;
        paddle.height = this.height;
        this.paddle = paddle;
        this.main.stage.addChild(this.paddle);
    }
    moveRight() {
        this.paddle.x += this.speed;
    }
    moveLeft() {
        this.paddle.x -= this.speed;
    }
    collide(ball) {
        //碰撞检测
        const bBall = ball.ball;
        const p = this.paddle;
        if(bBall.x >= p.x && bBall.x + ball.width <= p.x  + p.width && bBall.y >= p.y) {
            return true
        }
        return false;
    }
    collideRange(b) {
        //碰撞后改变小球方向
        const ball = b.ball; 
        const paddle = this.paddle;
        let range = (paddle.x + paddle.width / 2) - (ball.x + b.width / 2);
        if(range < 0) {
            //落在右边
          return range / (ball.width/2 + paddle.width/2) * this.ballSpeedMax
        }
        else {
            return range / (ball.width/2 + paddle.width/2) * this.ballSpeedMax
        }
    }
}

class Block{
    constructor(x, y) {
        const b = {
            width: 50, 
            height: 20,
            x,
            y,
            image: imageFromPath(allImage.block1),
            alive: true,
            block: null,
        };
        Object.assign(this, b);
        this.init();
    }
    init() {
        const block = new createjs.Bitmap(this.image);
        block.x = this.x;
        block.y = this.y;
        block.width = this.width;
        block.height = this.height;
        this.block = block;
    }
    collide(ball) {
        const b = ball.ball;
        const block = this.block;
        if(Math.abs((block.width / 2 + block.x) - (ball.x + b.width / 2)) > (block.width / 2 + b.width / 2) &&
            Math.abs((block.height / 2 + block.y) - (ball.y + b.height / 2)) > (block.height / 2 + b.height / 2)) {
            // this.kill();
            // ball.main.scene.removeChild(this.block);
            return true
        }
        else {
            return false;
        }
    }
    kill() {
        // this.main.scene.removeChild(this.block);
    }
}

class Scene{
    constructor(main) {
        const s = {
            main,
            blockList: [],
            lv: 1,
        };
        Object.assign(this, s);
        this.init();
    }

    init() {
        const scene = new createjs.Stage();
        let list = [];

        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 20; j++) {
                const block = new Block(j * 50, i * 20);
                list.push(block);
                scene.addChild(block.block);
            }
        }

        this.blockList = list;
        this.main.stage.addChild(scene);
        this.main.stage.update();
    }
}