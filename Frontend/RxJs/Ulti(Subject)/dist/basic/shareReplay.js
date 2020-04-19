"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const ajax_1 = require("rxjs/ajax");
const operators_1 = require("rxjs/operators");
const observer = {
    next: val => console.log('next', val),
    error: err => console.log('error', err),
    complete: () => console.log('complete')
};
const click$ = rxjs_1.fromEvent(document, 'click');
const ajax$ = ajax_1.ajax('https://api.github.com/users/octocat');
/*
 * shareReplay turns a unicast observable into multicasted
 * observable, utilizing a ReplaySubject behind the scenes.
 *
 * In this example, we are mapping any clicks to an ajax
 * request, sharing the response.
 */
const sharedClick$ = click$.pipe(operators_1.mergeMapTo(ajax$), 
/*
 * By default shareReplay shares all old values, like
 * a standard ReplaySubject. In this case, we only want
 * to share the most recent response.
 */
operators_1.shareReplay(2, 1000) // 최대 2개까지, 1초 안에 클릭된 것만
);
sharedClick$.subscribe(observer);
/*
 * Late subscribers will be replayed old value(s).
 */
setTimeout(() => {
    console.log('subscribing');
    sharedClick$.subscribe(observer);
}, 5000);
