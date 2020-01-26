import {interval, Subject} from 'rxjs';
import {filter, multicast, refCount, share, tap} from 'rxjs/operators';

const observer = {
    next(val:any){console.log('next', val)},
    error(err:any){console.log('error', err)},
    complete(){console.log('complete!')}
};

const interval$ = interval(2000).pipe(
    tap(i => console.log('new interval',i))
);

const multicastedInterval$ = interval$.pipe(
    multicast(() => new Subject()),
    refCount()
    // share()
);

// 내부적으로 `source.subscrbe(subject)를 호출
// multicastedInterval$.connect();


const subOne = multicastedInterval$.subscribe(observer);
const subTwo = multicastedInterval$.subscribe(observer);

setTimeout(() => {
    subOne.unsubscribe();
    subTwo.unsubscribe();
}, 3000);

