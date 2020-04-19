"use strict";
exports.__esModule = true;
var timeoutPromise = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve("1sec");
    }, 1000);
});
timeoutPromise.then(console.log);
var util_1 = require("./util"); //common.js 기반으로 만들어진다.
var value = util_1["default"](1, 2);
console.log(value);
// $ tsc hello.ts --lib es5, es2015.promise, es2015.iterable, dom
