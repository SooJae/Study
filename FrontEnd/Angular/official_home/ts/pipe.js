"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
var nums = rxjs_1.of(1, 2, 3, 4, 5);
// 옵저버블을 처리하는 함수를 정의합니다.
var squareOddVals = rxjs_1.pipe(operators_1.filter(function (n) { return n % 2 !== 0; }), operators_1.map(function (n) { return n * n; }));
// filter()와 map()을 실행하는 옵저버블을 생성합니다.
var squareOdd = squareOddVals(nums);
// 구독을 시작합니다.
squareOdd.subscribe(function (x) { return console.log(x); });
