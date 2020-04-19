"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const observer = {
    next(val) { console.log('next', val); },
    error(err) { console.log('error', err); },
    complete() { console.log('complete!'); }
};
// const sub = asyncScheduler.schedule(
//     console.log,
//     0,
//     'Hello World!'
// );
// sub.unsubscribe(); // 비동기가 아니므로 바로 끊는다.
// of(4,5,6, asyncScheduler).subscribe(observer);
rxjs_1.of(4, 5, 6)
    .pipe(operators_1.tap(val => console.log('from tap', val)), 
//use delay!
operators_1.observeOn(rxjs_1.asyncScheduler, 3000)).subscribe(observer);
rxjs_1.of(1, 2, 3).subscribe(observer);
console.log('sync');
