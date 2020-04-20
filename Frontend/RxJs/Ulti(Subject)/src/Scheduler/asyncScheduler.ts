import {asyncScheduler, of} from 'rxjs';
import {observeOn, subscribeOn, tap} from 'rxjs/operators';

const observer = {
    next(val:any){console.log('next', val)},
    error(err:any){console.log('error', err)},
    complete(){console.log('complete!')}
};

// const sub = asyncScheduler.schedule(
//     console.log,
//     0,
//     'Hello World!'
// );
// sub.unsubscribe(); // 비동기가 아니므로 바로 끊는다.

// of(4,5,6, asyncScheduler).subscribe(observer);
of(4,5,6)
    .pipe(
        tap(val=> console.log('from tap', val)),
        //use delay!
        observeOn(asyncScheduler, 3000),
        // subscribeOn(asyncScheduler, 3000),
    ).subscribe(observer);
of(1,2,3).subscribe(observer);
console.log('sync');
