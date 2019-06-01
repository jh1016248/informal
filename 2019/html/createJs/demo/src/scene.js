class Ball{
    constructor(main) {
        const b = {
            width: 18, 
            height: 18,
            x: main.ballX,
            y: main.ballY,
            speedX: 1,
            speedY: 5,
            image: imageFromPath(allImage.ball),
        };
        Object.assign(this, b);
    }
    move() {
        this.x -= this.speedX;
        this.y -= this.speedY;
    }
}