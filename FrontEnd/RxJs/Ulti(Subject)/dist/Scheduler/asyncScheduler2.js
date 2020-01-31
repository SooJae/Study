"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const observer = {
    next(val) { console.log('next', val); },
    error(err) { console.log('error', err); },
    complete() { console.log('complete!'); }
};
rxjs_1.asyncScheduler.schedule(() => {
    console.log('asyncScheduler');
});
rxjs_1.asapScheduler.schedule(() => {
    console.log('asapScheduler');
});
// queueMicrotask(() => console.log(
//     'from microtask'
// ));
Promise.resolve('from promise').then(console.log);
console.log('synchronous console.log');
/**
 * synchronous console.log
 * asapScheduler
 * from microtask
 * from promise
 * asyncScheduler
 **/
