"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const numbers$ = rxjs_1.of(1, '1', 2, 3, 4, 4, 5);
numbers$.pipe(operators_1.distinctUntilChanged()).subscribe(console.log);
