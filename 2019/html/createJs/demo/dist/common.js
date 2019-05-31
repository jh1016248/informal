"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var common = {
  imageFromPath: function imageFromPath(path) {
    var img = new Image();
    img.src = "../images/".concat(path);
    return img;
  }
};
var _default = common;
exports["default"] = _default;