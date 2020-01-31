"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const observer = {
    next(val) { console.log('next', val); },
    error(err) { console.log('error', err); },
    complete() { console.log('complete!'); }
};
const subject = new rxjs_1.BehaviorSubject('Hello');
const subscription = subject.subscribe(observer);
subject.next('Hello');
const secondSubscription = subject.subscribe(observer);
subject.next('World');
setTimeout(() => {
    subject.subscribe(observer);
}, 3000);
