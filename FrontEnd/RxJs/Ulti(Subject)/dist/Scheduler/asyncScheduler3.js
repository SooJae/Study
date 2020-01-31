"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const observer = {
    next(val) { console.log('next', val); },
    error(err) { console.log('error', err); },
    complete() { console.log('complete!'); }
};
rxjs_1.range(1, 5, rxjs_1.asapScheduler).subscribe(observer);
console.log('synchronous console.log');
/**
 synchronous console.log
 next 1
 next 2
 next 3
 next 4
 next 5
 complete!

 **/
