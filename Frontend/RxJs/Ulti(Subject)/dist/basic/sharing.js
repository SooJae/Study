"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const observer = {
    next(val) { console.log('next', val); },
    error(err) { console.log('error', err); },
    complete() { console.log('complete!'); }
};
const interval$ = rxjs_1.interval(2000).pipe(operators_1.tap(i => console.log('new interval', i)));
const multicastedInterval$ = interval$.pipe(
// multicast(() => new Subject()),
// refCount()
operators_1.share());
// 내부적으로 `source.subscrbe(subject)를 호출
// multicastedInterval$.connect();
const subOne = multicastedInterval$.subscribe(observer);
const subTwo = multicastedInterval$.subscribe(observer);
setTimeout(() => {
    subOne.unsubscribe();
    subTwo.unsubscribe();
}, 3000);
