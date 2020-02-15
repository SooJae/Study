"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
function* hello() {
    yield 'Hello';
    yield 'world';
}
const observer = {
    next(val) { console.log('next', val); },
    error(err) { console.log('error', err); },
    complete() { console.log('complete!'); }
};
const source$ = rxjs_1.from(hello());
source$.subscribe(observer);
