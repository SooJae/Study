"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const numbers = [1, 2, 3, 4, 5];
const user = [
    { name: 'Brian', loggedIn: false, token: null },
];
const totalReducer = (accumulator, currentValue) => {
    return accumulator + currentValue;
};
// const total = numbers.reduce(totalReducer, 0);
// console.log(total);
// from(numbers).pipe(
//   reduce(totalReducer,0)
// ).subscribe(console.log);
rxjs_1.interval(1000).pipe(operators_1.take(4), operators_1.reduce(totalReducer, 0)).subscribe((next) => console.log(next), rxjs_1.noop, () => console.log('Complete!'));
