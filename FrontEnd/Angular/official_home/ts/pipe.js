"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const operators_1 = require("rxjs/operators");
const rxjs_1 = require("rxjs");
const nums = rxjs_1.of(1, 2, 3, 4, 5);
// 옵저버블을 처리하는 함수를 정의합니다.
const squareOddVals = rxjs_1.pipe(operators_1.filter((n) => n % 2 !== 0), operators_1.map(n => n * n));
// filter()와 map()을 실행하는 옵저버블을 생성합니다.
const squareOdd = squareOddVals(nums);
// 구독을 시작합니다.
squareOdd.subscribe(x => console.log(x));
//# sourceMappingURL=pipe.js.map