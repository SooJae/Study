"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
// 1~10 중 짝수 필터
rxjs_1.range(1, 10).pipe(operators_1.filter(x => x % 2 === 0), operators_1.map(x => x + 1)).subscribe(x => console.log(x));
