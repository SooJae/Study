"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const number$ = rxjs_1.of(1, 2, 3, 4, 5);
const click$ = rxjs_1.fromEvent(document, 'click');
click$.pipe(operators_1.map(event => ({
    x: event.clientX,
    y: event.clientY
})), 
//take(1)
operators_1.first(({ y }) => y > 200)).subscribe(next => console.log(next), rxjs_1.noop, () => console.log('Complete!'));
