(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var list = [1, 2, 3];
var list2 = [1, 2, 3, 4];
var Base = /** @class */ (function () {
    function Base() {
    }
    return Base;
}());
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User(user) {
        var _this = _super.call(this) || this;
        _this.name = user.name;
        _this.pwd = user.pwd;
        return _this;
    }
    return User;
}(Base));
exports["default"] = User;
},{}],2:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var User_1 = require("./User");
var joho = new User_1["default"]({ id: '1', name: '2', pwd: '2' });
console.log(joho);
function sum(a, b) {
    return a + b;
}
},{"./User":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9fYnJvd3Nlci1wYWNrQDYuMS4wQGJyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsInNyYy9Vc2VyLnRzIiwic3JjL21haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUNPQSxJQUFNLElBQUksR0FBWSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUE7QUFDN0IsSUFBTSxLQUFLLEdBQWtCLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7QUFHdkM7SUFBQTtJQUVBLENBQUM7SUFBRCxXQUFDO0FBQUQsQ0FGQSxBQUVDLElBQUE7QUFDRDtJQUFtQix3QkFBSTtJQUluQixjQUFZLElBQVU7UUFBdEIsWUFDSSxpQkFBTyxTQUdWO1FBRkcsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3RCLEtBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQzs7SUFDeEIsQ0FBQztJQUNMLFdBQUM7QUFBRCxDQVRBLEFBU0MsQ0FUa0IsSUFBSSxHQVN0QjtBQUNELHFCQUFlLElBQUksQ0FBQTs7OztBQ3hCbkIsK0JBQTBCO0FBQzFCLElBQU0sSUFBSSxHQUFHLElBQUksaUJBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztBQUN4RCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO0FBRWpCLFNBQVMsR0FBRyxDQUFDLENBQVMsRUFBRSxDQUFTO0lBQzdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNqQixDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiXHJcbmludGVyZmFjZSBVc2VyIHtcclxuICAgIGlkOiBzdHJpbmcsXHJcbiAgICBuYW1lOiBzdHJpbmcsXHJcbiAgICBwd2Q6IHN0cmluZyxcclxufVxyXG5cclxuY29uc3QgbGlzdDpudW1iZXJbXSA9IFsxLDIsM11cclxuY29uc3QgbGlzdDI6IEFycmF5PG51bWJlcj4gPSBbMSwyLDMsNF07XHJcblxyXG5cclxuY2xhc3MgQmFzZSB7XHJcbiAgICBpZDogc3RyaW5nO1xyXG59XHJcbmNsYXNzIFVzZXIgZXh0ZW5kcyBCYXNlIHtcclxuICAgIGlkOiBzdHJpbmc7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBwd2Q6IHN0cmluZztcclxuICAgIGNvbnN0cnVjdG9yKHVzZXI6IFVzZXIpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IHVzZXIubmFtZTtcclxuICAgICAgICB0aGlzLnB3ZCA9IHVzZXIucHdkO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IFVzZXIiLCJpbXBvcnQgVXNlciBmcm9tICcuL1VzZXInO1xyXG5jb25zdCBqb2hvID0gbmV3IFVzZXIoeyBpZDogJzEnLCBuYW1lOiAnMicsIHB3ZDogJzInIH0pO1xyXG5jb25zb2xlLmxvZyhqb2hvKVxyXG5cclxuZnVuY3Rpb24gc3VtKGE6IHN0cmluZywgYjogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBhICsgYjtcclxufSJdfQ==
