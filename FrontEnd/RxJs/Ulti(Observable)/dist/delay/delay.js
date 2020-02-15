"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
// timer(1000).
//     pipe(
//         delay(2000),
//         timeInterval(),
//         map(int => Math.floor(int.interval / 1000))
//     )
//     .subscribe(second => console.log(`${second}`));
// of(1,2,3,4,5)
//     .pipe(
//         delay(2000),
//         tap(console.log),
//
//     ).subscribe(console.log)
rxjs_1.from([1, 2])
    .pipe(operators_1.delay(2000), operators_1.concatMap(() => rxjs_1.from([3, 4])), operators_1.delay(2000), operators_1.concatMap(() => rxjs_1.from([5, 6])), operators_1.delay(2000)).subscribe(console.log);
