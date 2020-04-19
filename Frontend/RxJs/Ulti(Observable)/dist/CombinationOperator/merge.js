"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const keyup$ = rxjs_1.fromEvent(document, 'keyup');
const click$ = rxjs_1.fromEvent(document, 'click');
// keyup$.subscribe(console.log);
// click$.subscribe(console.log);
rxjs_1.merge(keyup$, click$).subscribe(console.log);
