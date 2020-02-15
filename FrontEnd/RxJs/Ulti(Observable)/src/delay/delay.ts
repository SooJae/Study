import {concat, from, of, pipe, timer} from 'rxjs';
import {concatMap, delay, map, tap, timeInterval} from 'rxjs/operators';


// timer(1000).
//     pipe(
//         delay(2000),
//         timeInterval(),
//         map(int => Math.floor(int.interval / 1000))
//     )
//     .subscribe(second => console.log(`${second}`));


// of(1,2,3,4,5)
//     .pipe(
//         delay(2000),
//         tap(console.log),
//
//     ).subscribe(console.log)


from([1,2])
.pipe(
    delay(2000),
    concatMap(()=>from([3,4])),
    delay(2000),
    concatMap(()=>from([5,6])),
    delay(2000),
).subscribe(console.log)
