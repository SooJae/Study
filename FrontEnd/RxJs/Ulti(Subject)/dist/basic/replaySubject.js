"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const observer = {
    next(val) { console.log('next', val); },
    error(err) { console.log('error', err); },
    complete() { console.log('complete!'); }
};
const subject = new rxjs_1.ReplaySubject(2);
subject.next('hello');
subject.next('world');
subject.next('goodbye');
subject.subscribe(observer);
