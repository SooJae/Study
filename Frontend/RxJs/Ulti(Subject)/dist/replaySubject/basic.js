"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const observer = {
    next(val) { console.log('next', val); },
    error(err) { console.log('error', err); },
    complete() { console.log('complete!'); }
};
const subject = new rxjs_1.Subject();
const subscription = subject.subscribe(observer);
subject.next('Hello');
const subscriptionTwo = subject.subscribe(observer);
subject.next('World');
const interval$ = rxjs_1.interval(2000).pipe(operators_1.tap(value => console.log('new interval', value)));
// interval$.subscribe(observer);
// interval$.subscribe(observer);
/*
next Hello
next World
next World
new interval 0
next 0
new interval 0
next 0
new interval 1
next 1
new interval 1
next 1

 */
// interval$.subscribe(subject);
/*
next Hello
next World
next World
new interval 0
next 0
next 0
new interval 1
next 1
next 1
new interval 2
next 2
next 2
 */
