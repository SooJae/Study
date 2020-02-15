"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const numbers$ = rxjs_1.of(1, 2, 3);
numbers$.pipe(operators_1.startWith('a', 'b', 'c'), endWith('a', 'b', 'c')).subscribe(console.log);
/*
a
b
c
1
2
3
a
b
c
 */
