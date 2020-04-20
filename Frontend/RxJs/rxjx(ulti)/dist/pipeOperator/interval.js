"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const timer$ = rxjs_1.timer(1000);
timer$.subscribe(console.log);
