"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Game =
/*#__PURE__*/
function () {
  function Game(main) {
    _classCallCheck(this, Game);

    var g = {
      main: main,
      state: 1,
      // 游戏状态值，初始默认为1
      GAME_START: 1,
      GAME_RUNNING: 2,
      GAME_STOP: 3,
      GAME_OVER: 4,
      timer: null,
      actions: [],
      keydowns: {},
      isPaddleRight: true,
      isPaddleLeft: true
    };
    Object.assign(this, g);
  }

  _createClass(Game, [{
    key: "init",
    value: function init() {
      this.addEvent();
      this.setTimer();
    }
  }, {
    key: "setTimer",
    value: function setTimer() {
      var _this = this;

      this.timer = setInterval(function () {
        var actions = _this.actions;
        Object.keys(actions).forEach(function (action) {
          if (action && _this.keydowns[action]) {
            actions[action]();
          }
        });

        if (_this.isOver()) {
          console.log('game over');
        }

        if (_this.isRunning()) {
          _this.checkBallBlock();
        }

        _this.main.stage.update();
      }, 1000 / 60);
    }
  }, {
    key: "checkBallBlock",
    value: function checkBallBlock() {
      var _this$main = this.main,
          ball = _this$main.ball,
          paddle = _this$main.paddle,
          scene = _this$main.scene;

      if (paddle.collide(ball)) {
        ball.speedY *= -1;
        ball.speedX = paddle.collideRange(ball);
      }

      ;

      if (paddle.paddle.x <= 0) {
        this.isPaddleLeft = false;
      } else {
        this.isPaddleLeft = true;
      }

      if (paddle.paddle.x + paddle.w >= 1000) {
        this.isPaddleRight = false;
        0;
      } else {
        this.isPaddleRight = true;
      }

      ball.move(this);
    }
  }, {
    key: "addEvent",
    value: function addEvent() {
      var _this2 = this;

      var paddle = this.main.paddle;
      window.addEventListener('keydown', function (e) {
        _this2.keydowns[e.keyCode] = true;
      });
      window.addEventListener('keyup', function (e) {
        _this2.keydowns[e.keyCode] = false;
      }); //注册板子右移事件

      this.on(39, function () {
        if (_this2.state === _this2.GAME_RUNNING && _this2.isPaddleRight) {
          paddle.moveRight();
        }
      }); //注册板子左移事件

      this.on(37, function () {
        if (_this2.state === _this2.GAME_RUNNING && _this2.isPaddleLeft) {
          paddle.moveLeft();
        }
      }); //注册开始暂停事件

      window.addEventListener('keydown', function (e) {
        switch (e.keyCode) {
          case 32:
            if (_this2.isStart()) {
              _this2.state = _this2.GAME_RUNNING;
            }

            break;
        }
      });
    }
  }, {
    key: "on",
    value: function on(handle, func) {
      this.actions[handle] = func;
    }
  }, {
    key: "emit",
    value: function emit(handle, props) {
      typeof this.actions[handle] === 'function' && this.actions[handle](props);
    }
  }, {
    key: "off",
    value: function off(handle) {
      this.actions[handle] = null;
    }
  }, {
    key: "isRunning",
    value: function isRunning() {
      return this.state === this.GAME_RUNNING;
    }
  }, {
    key: "isOver",
    value: function isOver() {
      return this.state === this.GAME_OVER;
    }
  }, {
    key: "isStart",
    value: function isStart() {
      return this.state === this.GAME_START;
    }
  }, {
    key: "isStop",
    value: function isStop() {
      return this.state === this.GAME_STOP;
    }
  }, {
    key: "resetGame",
    value: function resetGame() {}
  }]);

  return Game;
}();