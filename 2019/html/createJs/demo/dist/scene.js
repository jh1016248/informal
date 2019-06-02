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
      width: 18,
      height: 18,
      x: main.ballX,
      y: main.ballY,
      speedX: 1,
      speedY: 5,
      image: imageFromPath(allImage.ball),
      ball: ball
    };
    Object.assign(this, b);
    this.init();
  }

  _createClass(Ball, [{
    key: "init",
    value: function init() {
      this.ball = new createjs.Bitmap(this.image);
    }
  }, {
    key: "move",
    value: function move() {
      this.x -= this.speedX;
      this.y -= this.speedY;
    }
  }]);

  return Ball;
}();