"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function test() {
  var stage = new createjs.Stage('canvas');
  var bitmap = new createjs.Bitmap(allImage.background);
  stage.addChild(bitmap);
  stage.update();
  var main = {
    stage: stage
  };
  new Pen(main);
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
        var myGraphics = new createjs.Graphics();
        myGraphics.beginFill("red").drawRect(e.stageX, e.stageY, 1, 1);
        newShape = new createjs.Shape(myGraphics);
        stage.addChild(newShape);
        stage.update();
      });
      stage.addEventListener('stagemousemove', function (e) {
        if (_this.painting) {
          log(newShape);
          newShape.graphics.lineTo(e.stageX, e.stageY);
          stage.update();
        }
      });
      stage.addEventListener('stagemouseup', function (e) {
        log(e);
        _this.painting = false;
      });
    }
  }]);

  return Pen;
}();

window.addEventListener('DOMContentLoaded', function () {
  test();
  var _main = {
    LV: 1,
    init: function init() {
      var game = new Game();
      game.init(_main);
    }
  }; // main.init();
});