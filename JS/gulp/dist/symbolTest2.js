"use strict";

var includes = Symbol('즐거운 자바스크립트');

Array.prototype[includes] = function () {
  return console.log('its Symbol');
};

var arr = [1, 2, 3];
arr.includes(1); // true

arr['includes'](1); // true

arr[includes](); // its Symbol