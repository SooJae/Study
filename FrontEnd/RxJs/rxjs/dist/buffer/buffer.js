"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
rxjs_1.timer(0, 50)
    .pipe(operators_1.buffer(rxjs_1.timer(500)))
    .subscribe(console.log);
