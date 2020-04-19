"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
function hello() {
    return 'hello world';
}
const observer = {
    next(val) { console.log('next', val); },
    error(err) { console.log('error', err); },
    complete() { console.log('complete!'); }
};
const source$ = rxjs_1.range(0.1, 5);
source$.subscribe(observer);
console.log(hello());
