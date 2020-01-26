"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const observer = {
    next(value) { console.log('next', value); },
    error(error) { console.log('error', error); },
    complete() { console.log('complete!'); }
    // error: error => console.log('error', error),
    // complete: () => console.log('complete!')
};
const observable = new rxjs_1.Observable(subscriber => {
    // subscriber.next('Hello');
    // subscriber.next('World');
    // subscriber.error('error!');
    // subscriber.next('dd');
    let count = 0;
    const id = setInterval(() => {
        subscriber.next(count);
        // subscriber.complete();
        // subscriber.error();
        count += 1;
    }, 1000);
    // error 또는 complete가 되면 return이 실행 된다.
    return () => {
        console.log('called');
        clearInterval(id);
    };
});
const subscription = observable.subscribe(observer
// observer here
);
const subscriptionTwo = observable.subscribe(observer);
subscription.add(subscriptionTwo);
setTimeout(() => {
    subscription.unsubscribe();
}, 3500);
