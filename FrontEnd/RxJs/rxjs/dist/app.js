"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
rxjs_1.range(1, 10).pipe(operators_1.tap((x) => console.log('tap:' + x), (err) => console.error(err), () => console.log('tap complete')), operators_1.filter(x => !(x % 2)), operators_1.map(x => x + 1)).subscribe((x) => console.log('subscribe:' + x), (err) => console.error(err), () => console.log('complete'));
