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
      canvas: document.querySelector('#canvas'),
      context: document.querySelector('#canvas').getContext('2d'),
      state: 1,
      // 游戏状态值，初始默认为1
      GAME_START: 1,
      GAME_RUNNING: 2,
      GAME_STOP: 3,
      GAME_OVER: 4,
      timer: null
    };
    Object.assign(this, g);
  }

  _createClass(Game, [{
    key: "init",
    value: function init() {}
  }, {
    key: "resetGame",
    value: function resetGame() {}
  }]);

  return Game;
}();