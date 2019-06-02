"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

window.addEventListener('DOMContentLoaded', function () {
  var _main = {
    stage: new createjs.Stage('canvas'),
    LV: 1,
    scene: null,
    blockList: null,
    ball: null,
    paddle: null,
    score: null,
    ball_x: 491,
    ball_y: 432,
    game: null,
    init: function init() {
      this.ball = new Ball(this);
      this.game = new Game(this);
      this.game.init();
    }
  };

  _main.init();
});

function test() {
  var stage = new createjs.Stage('canvas');
  var bitmap = new createjs.Bitmap(allImage.background);
  stage.addChild(bitmap);
  setTimeout(function () {
    stage.update();
  });
  var main = {
    stage: stage
  };
  var game = new Game(main);
}

var Pen =
/*#__PURE__*/
function () {
  function Pen(main) {
    _classCallCheck(this, Pen);

    var p = {
      main: main,
      painting: false,
      move: false,
      startX: 0,
      startY: 0
    };
    Object.assign(this, p);
    this.regEvent();
  }

  _createClass(Pen, [{
    key: "regEvent",
    value: function regEvent() {
      var _this = this;

      // createjs.Ticker.setFPS(60)
      var stage = this.main.stage;
      var newShape;
      stage.addEventListener('mousedown', function (e) {
        _this.painting = true;
        _this.stageX = e.stageX;
        _this.stageY = e.stageY;

        if (!newShape) {
          var myGraphics = new createjs.Graphics();
          myGraphics.setStrokeStyle(2, "round").moveTo(e.stageX, e.stageY);
          newShape = new createjs.Shape(myGraphics);
          stage.addChild(newShape);
        }
      });
      stage.addEventListener('stagemousemove', function (e) {
        if (_this.painting) {
          newShape.graphics.moveTo(_this.startX, _this.startY).lineTo(e.stageX, e.stageY).beginStroke('red');
          stage.update();
          _this.startX = e.stageX;
          _this.startY = e.stageY;
        }
      });
      stage.addEventListener('stagemouseup', function (e) {
        newShape && newShape.graphics.endStroke();
        _this.painting = false;
      });
    }
  }]);

  return Pen;
}();