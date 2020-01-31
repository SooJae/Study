import {asapScheduler, asyncScheduler, of, range} from 'rxjs';
import {observeOn, subscribeOn, tap} from 'rxjs/operators';

const observer = {
    next(val:any){console.log('next', val)},
    error(err:any){console.log('error', err)},
    complete(){console.log('complete!')}
};

range(1,5,asapScheduler).subscribe(observer);
console.log('synchronous console.log');
/**
 synchronous console.log
 next 1
 next 2
 next 3
 next 4
 next 5
 complete!

 **/
