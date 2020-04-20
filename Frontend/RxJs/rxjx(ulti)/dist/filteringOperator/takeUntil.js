"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const counter$ = rxjs_1.interval(1000);
const click$ = rxjs_1.fromEvent(document, 'click');
counter$.pipe(operators_1.takeUntil(click$) // click observable로 멈춘다.
).subscribe(console.log);
