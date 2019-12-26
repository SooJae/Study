"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const btnClickStream = rxjs_1.Observable
    .fromEvent(addLocationBtn, 'click')
    .map(() => true)
    .forEach(val => console.log('btnClickStream val', val));
