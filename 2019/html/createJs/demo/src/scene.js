
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
        ball.width = this.w;
        ball.height = this.h;
        this.ball = ball;
        this.main.stage.addChild(this.ball);
    }
    move() {
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
            w: 102,
            h: 22,
            image: imageFromPath(allImage.paddle),
        }
        Object.assign(this, p);
        this.init()
    }
    init() {
        const paddle = new createjs.Bitmap(this.image);
        paddle.x = this.x;
        paddle.y = this.y;
        paddle.width = this.w;
        paddle.height = this.h;
        this.paddle = paddle;
        this.main.stage.addChild(this.paddle);
    }
    moveRight() {
        const max = 1000 - this.w;
        const x = this.paddle.x + 15;
        this.paddle.x = x >= max ? max : x;
    }

    moveLeft() {
        const x = this.paddle.x - 15;
        this.paddle.x = x <= 0 ? 0 : x;
    }
}