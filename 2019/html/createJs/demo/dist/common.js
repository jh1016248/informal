"use strict";

function imageFromPath(path) {
  var img = new Image();
  img.src = "../images/".concat(path);
  return img;
}

;

function log(msg) {
  console.log.call(console, msg);
}

var allImage = {
  background: '../images/background.jpg',
  ball: '../images/ball.png'
};