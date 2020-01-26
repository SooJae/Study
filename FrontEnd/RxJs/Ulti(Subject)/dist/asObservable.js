"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const myObservable = new rxjs_1.Subject();
const myObservable$ = myObservable.asObservable();
myObservable$.next();
