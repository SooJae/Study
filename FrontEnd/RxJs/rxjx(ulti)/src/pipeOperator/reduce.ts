import {from, interval, noop} from 'rxjs';
import {reduce, take} from 'rxjs/operators';

const numbers = [1,2,3,4,5];
const user = [
    {name: 'Brian', loggedIn:false, token:null},

]

const totalReducer = (accumulator:any, currentValue:any) => {
    return accumulator + currentValue;
};

// const total = numbers.reduce(totalReducer, 0);
// console.log(total);

// from(numbers).pipe(
//   reduce(totalReducer,0)
// ).subscribe(console.log);


interval(1000).pipe(
    take(4),
    reduce(totalReducer,0)
).subscribe(
    (next)=> console.log(next),
    noop,
    () => console.log('Complete!')
);
