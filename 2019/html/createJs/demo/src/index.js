window.addEventListener('DOMContentLoaded', () => {
    const _main = {
        stage: new createjs.Stage('canvas'),
        LV: 1,
        scene: null,
        blockList: null,
        ball: null,
        paddle: null,
        score: null,
        ball_x: 491,
        ball_y: 432,
        paddle_x: 449,
        paddle_y: 450,
        background: imageFromPath(allImage.background),
        game: null,
        init() {
            const background = new createjs.Bitmap(this.background);
            this.stage.addChild(background);
            this.ball = new Ball(this);
            this.game = new Game(this);
            this.paddle = new Paddle(this);
            this.game.init();
        }
    };
    _main.init();
})



function test() {
    const stage = new createjs.Stage('canvas');
    const bitmap = new createjs.Bitmap(allImage.background);
    stage.addChild(bitmap)
    setTimeout(() => {
        stage.update()
    })
    const main = {
        stage,
    }
    const game = new Game(main);
}


class Pen {
    constructor(main) {
        const p = {
            main: main,
            painting: false,
            move: false,
            startX: 0,
            startY: 0
        };
        Object.assign(this, p);
        this.regEvent();
    }

    regEvent() {
        // createjs.Ticker.setFPS(60)
        const { stage } = this.main;
        let newShape;
        stage.addEventListener('mousedown', (e) => {
            this.painting = true;
            this.stageX = e.stageX;
            this.stageY = e.stageY;
            if(!newShape) {
                const myGraphics = new createjs.Graphics();
                myGraphics.setStrokeStyle(2, "round").moveTo(e.stageX, e.stageY)
                newShape = new createjs.Shape(myGraphics);
                stage.addChild(newShape);
            }
        })
        stage.addEventListener('stagemousemove', (e) => {
            if (this.painting) {
                newShape.graphics.moveTo(this.startX, this.startY).lineTo(e.stageX, e.stageY).beginStroke('red')
                stage.update();
                this.startX = e.stageX;
                this.startY = e.stageY;
            }
        })
        stage.addEventListener('stagemouseup', e => {
            newShape && newShape.graphics.endStroke();
            this.painting = false;
        })
    }
}
