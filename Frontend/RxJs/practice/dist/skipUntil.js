"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
rxjs_1.of({ a: 1, b: 10 }, { a: 1, b: 10 }, { a: 2, b: 20 }, { a: 3, b: 30 }, { a: 3, b: 30 }, { a: 2, b: 20 }).pipe(operators_1.map(x => x.a)).subscribe(x => console.log(x));
