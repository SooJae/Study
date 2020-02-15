"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const number$ = rxjs_1.of(1, 2, 3, 4, 5);
const click$ = rxjs_1.fromEvent(document, 'click');
click$.pipe(operators_1.map(event => ({
    x: event.clientX,
    y: event.clientY
})), operators_1.takeWhile(({ y }) => y <= 200), // y의 좌표가 200이상이면 종료 (y좌표 값을 반환하지 않음)
operators_1.takeWhile(({ y }) => y <= 200, true) // y의 좌표가 200이상이면 종료 (y좌표 값을 반환 함)
).subscribe(next => console.log(next), rxjs_1.noop, () => console.log('Complete!'));
