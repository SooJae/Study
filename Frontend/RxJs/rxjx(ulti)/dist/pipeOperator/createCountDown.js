"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const counter$ = rxjs_1.interval(1000);
counter$.pipe(operators_1.mapTo(-1), // mapTo로 값을 고정해서 각각의 값을 -1로 하는 curr을 scan으로 넘겨줌
operators_1.scan((acc, curr) => {
    return acc + curr;
}, 10), operators_1.filter(value => value >= 0)).subscribe(console.log);
