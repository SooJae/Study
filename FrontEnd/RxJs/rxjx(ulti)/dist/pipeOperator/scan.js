"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const user = [
    { name: 'Brian', loggedIn: false, token: null },
    { name: 'Brian', loggedIn: true, token: 'abc' },
    { name: 'Brian', loggedIn: true, token: '123' },
];
const totalReducer = (accumulator, currentValue) => {
    const result = { ...accumulator, ...currentValue };
    console.log('result', result);
    return { ...accumulator, ...currentValue }; // accumulator = currentValue
    // 예전 값 위에 최근 값을 덮어 씌운다.
};
// const total = numbers.reduce(totalReducer, 0);
// console.log(total);
const state$ = rxjs_1.from(user).pipe(operators_1.scan(totalReducer, { abc: 'abc' }));
const name$ = state$.pipe(operators_1.distinctUntilChanged((prev, curr) => {
    return prev.name === curr.name;
}), //이렇게 써야 한번만 출력한다.
operators_1.distinctUntilKeyChanged('name'), operators_1.map(state => state.name), operators_1.distinctUntilChanged() // 이것으로 Brian을 3번에서 한번만 출력한다.
);
name$.subscribe(console.log);
