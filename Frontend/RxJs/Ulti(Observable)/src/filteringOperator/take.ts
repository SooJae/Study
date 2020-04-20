import {fromEvent, noop, of} from 'rxjs';
import {first, map, take} from 'rxjs/operators';

const number$ = of(1,2,3,4,5);
const click$ = fromEvent(document, 'click');

click$.pipe(
    map(event => ({
        x: event.clientX,
        y: event.clientY
    })),

    //take(1)
    first(({y})=> y> 200), // 해당 조건 달성할 시에 한번만 실행하고 종료
).subscribe(
    next => console.log(next),
    noop,
    () => console.log('Complete!'),
);
