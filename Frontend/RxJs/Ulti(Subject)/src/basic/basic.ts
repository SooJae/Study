import {interval, Subject} from 'rxjs';
import {filter, tap} from 'rxjs/operators';

const observer = {
    next(val:any){console.log('next', val)},
    error(err:any){console.log('error', err)},
    complete(){console.log('complete!')}
};

const subject = new Subject();

// const subscription = subject.subscribe(observer);

subject.next('Hello');

const subscriptionTwo = subject.subscribe(
    observer
);

subject.next('World');

const interval$ = interval(2000).pipe(
    tap(value => console.log('new interval', value))
);
// interval$.subscribe(observer);
// interval$.subscribe(observer);
/*
next Hello
next World
next World
new interval 0
next 0
new interval 0
next 0
new interval 1
next 1
new interval 1
next 1

 */

interval$.subscribe(subject);
/*
next Hello
next World
next World
new interval 0
next 0
next 0
new interval 1
next 1
next 1
new interval 2
next 2
next 2
 */


