import {asapScheduler, asyncScheduler, of} from 'rxjs';
import {observeOn, subscribeOn, tap} from 'rxjs/operators';

const observer = {
    next(val:any){console.log('next', val)},
    error(err:any){console.log('error', err)},
    complete(){console.log('complete!')}
};

asyncScheduler.schedule(() => {
    console.log('asyncScheduler')
});
asapScheduler.schedule(() => {
    console.log('asapScheduler')
});
// queueMicrotask(() => console.log(
//     'from microtask'
// ));
Promise.resolve('from promise').then(console.log);
console.log('synchronous console.log');

/**
 * synchronous console.log
 * asapScheduler
 * from microtask
 * from promise
 * asyncScheduler
 **/
