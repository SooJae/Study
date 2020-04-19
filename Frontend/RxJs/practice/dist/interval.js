"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
rxjs_1.interval(1000).pipe(operators_1.takeWhile(x => x < 4)).subscribe(x => console.log(x));
