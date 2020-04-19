"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const observer = {
    next(val) { console.log('next', val); },
    error(err) { console.log('error', err); },
    complete() { console.log('complete!'); }
};
const source$ = rxjs_1.fromEvent(document, 'click');
const subOne = source$.subscribe(observer);
const subTwo = source$.subscribe(observer);
setTimeout(() => {
    console.log('unsubscribing');
    subOne.unsubscribe();
}, 3000);
