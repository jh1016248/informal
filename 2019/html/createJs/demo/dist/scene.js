"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Ball =
/*#__PURE__*/
function () {
  function Ball(main) {
    _classCallCheck(this, Ball);

    var b = {
      main: main,
      width: 18,
      height: 18,
      x: main.ball_x,
      y: main.ball_y,
      speedX: 1,
      speedY: 5,
      image: imageFromPath(allImage.ball),
      ball: null
    };
    Object.assign(this, b);
    this.init();
  }

  _createClass(Ball, [{
    key: "init",
    value: function init() {
      var ball = new createjs.Bitmap(this.image);
      ball.x = this.x;
      ball.y = this.y;
      ball.width = this.width;
      ball.height = this.height;
      this.ball = ball;
      this.main.stage.addChild(this.ball);
    }
  }, {
    key: "move",
    value: function move(game) {
      var _this$ball = this.ball,
          x = _this$ball.x,
          y = _this$ball.y,
          width = _this$ball.width;

      if (x <= 0 || x + width >= 1000) {
        this.speedX *= -1;
      }

      if (y <= 0) {
        this.speedY *= -1;
      }

      if (y >= 500 - this.height) {
        game.state = game.GAME_OVER;
      }

      this.ball.x -= this.speedX;
      this.ball.y -= this.speedY;
    }
  }]);

  return Ball;
}();

var Paddle =
/*#__PURE__*/
function () {
  function Paddle(main) {
    _classCallCheck(this, Paddle);

    var p = {
      main: main,
      paddle: null,
      x: main.paddle_x,
      y: main.paddle_y,
      width: 102,
      height: 22,
      speed: 10,
      ballSpeedMax: 8,
      image: imageFromPath(allImage.paddle)
    };
    Object.assign(this, p);
    this.init();
  }

  _createClass(Paddle, [{
    key: "init",
    value: function init() {
      var paddle = new createjs.Bitmap(this.image);
      paddle.x = this.x;
      paddle.y = this.y;
      paddle.width = this.width;
      paddle.height = this.height;
      this.paddle = paddle;
      this.main.stage.addChild(this.paddle);
    }
  }, {
    key: "moveRight",
    value: function moveRight() {
      this.paddle.x += this.speed;
    }
  }, {
    key: "moveLeft",
    value: function moveLeft() {
      this.paddle.x -= this.speed;
    }
  }, {
    key: "collide",
    value: function collide(ball) {
      //碰撞检测
      var bBall = ball.ball;
      var p = this.paddle;

      if (bBall.x >= p.x && bBall.x + ball.width <= p.x + p.width && bBall.y >= p.y) {
        return true;
      }

      return false;
    }
  }, {
    key: "collideRange",
    value: function collideRange(b) {
      //碰撞后改变小球方向
      var ball = b.ball;
      var paddle = this.paddle;
      var range = paddle.x + paddle.width / 2 - (ball.x + b.width / 2);

      if (range < 0) {
        //落在右边
        return range / (ball.width / 2 + paddle.width / 2) * this.ballSpeedMax;
      } else {
        return range / (ball.width / 2 + paddle.width / 2) * this.ballSpeedMax;
      }
    }
  }]);

  return Paddle;
}();

var Block =
/*#__PURE__*/
function () {
  function Block(x, y) {
    _classCallCheck(this, Block);

    var b = {
      width: 50,
      height: 20,
      x: x,
      y: y,
      image: imageFromPath(allImage.block1),
      alive: true,
      block: null
    };
    Object.assign(this, b);
    this.init();
  }

  _createClass(Block, [{
    key: "init",
    value: function init() {
      var block = new createjs.Bitmap(this.image);
      block.x = this.x;
      block.y = this.y;
      block.width = this.width;
      block.height = this.height;
      this.block = block;
    }
  }, {
    key: "collide",
    value: function collide(ball) {
      var b = ball.ball;
      var block = this.block;

      if (Math.abs(block.width / 2 + block.x - (ball.x + b.width / 2)) > block.width / 2 + b.width / 2 && Math.abs(block.height / 2 + block.y - (ball.y + b.height / 2)) > block.height / 2 + b.height / 2) {
        // this.kill();
        // ball.main.scene.removeChild(this.block);
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: "kill",
    value: function kill() {// this.main.scene.removeChild(this.block);
    }
  }]);

  return Block;
}();

var Scene =
/*#__PURE__*/
function () {
  function Scene(main) {
    _classCallCheck(this, Scene);

    var s = {
      main: main,
      blockList: [],
      lv: 1
    };
    Object.assign(this, s);
    this.init();
  }

  _createClass(Scene, [{
    key: "init",
    value: function init() {
      var scene = new createjs.Stage();
      var list = [];

      for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 20; j++) {
          var block = new Block(j * 50, i * 20);
          list.push(block);
          scene.addChild(block.block);
        }
      }

      this.blockList = list;
      this.main.stage.addChild(scene);
      this.main.stage.update();
    }
  }]);

  return Scene;
}();