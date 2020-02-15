"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
// helpers
function calculateScrollPercent(element) {
    const { scrollTop, scrollHeight, clientHeight } = element;
    return (scrollTop / (scrollHeight - clientHeight)) * 100;
}
const scroll$ = rxjs_1.fromEvent(document, 'scroll');
const progress$ = scroll$.pipe(
// percent progress
operators_1.map(({ target }) => calculateScrollPercent(target.documentElement)));
progress$.subscribe(console.log);
