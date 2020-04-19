"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const keyup$ = rxjs_1.fromEvent(document, 'keyup');
const keycode$ = keyup$.pipe(operators_1.map(event => event.code));
const keycodeWithPluck$ = keyup$.pipe(
// pluck('code')
operators_1.pluck('target', 'nodeName') // nested된 곳에 유리하다.
);
// KeyD
// KeyS
// Space
const pressed$ = keyup$.pipe(operators_1.mapTo('Key Pressed!') // 영구적인 값을 리턴한다.
);
const enter$ = keycode$.pipe(operators_1.filter(code => code === 'Enter'));
// keycode$.subscribe(console.log);
keycodeWithPluck$.subscribe(console.log);
enter$.subscribe(console.log);
