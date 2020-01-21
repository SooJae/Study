import {from, interval, noop} from 'rxjs';
import {distinctUntilChanged, distinctUntilKeyChanged, map, reduce, scan, take} from 'rxjs/operators';

const user = [
    {name: 'Brian', loggedIn:false, token:null},
    {name: 'Brian', loggedIn:true, token:'abc'},
    {name: 'Brian', loggedIn:true, token:'123'},

]

const totalReducer = (accumulator:any, currentValue:any) => {

    const result = {...accumulator , ...currentValue};
    console.log('result',result);
    return {...accumulator, ...currentValue}; // accumulator = currentValue
    // 예전 값 위에 최근 값을 덮어 씌운다.
};

// const total = numbers.reduce(totalReducer, 0);
// console.log(total);

const state$ = from(user).pipe(
  scan(totalReducer,{abc:'abc'})
);

const name$ = state$.pipe(
    distinctUntilChanged((prev,curr) =>{
        return prev.name === curr.name;
    }), //이렇게 써야 한번만 출력한다.
    distinctUntilKeyChanged('name'),
    map(state => state.name),
    distinctUntilChanged() // 이것으로 Brian을 3번에서 한번만 출력한다.
);

name$.subscribe(console.log);

