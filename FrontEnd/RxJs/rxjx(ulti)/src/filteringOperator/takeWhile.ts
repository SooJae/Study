import {fromEvent, noop, of} from 'rxjs';
import {first, map, take, takeWhile} from 'rxjs/operators';

const number$ = of(1,2,3,4,5);
const click$ = fromEvent(document, 'click');

click$.pipe(
    map(event => ({
        x: event.clientX,
        y: event.clientY
    })),
    takeWhile(({y}) => y<=200), // y의 좌표가 200이상이면 종료 (y좌표 값을 반환하지 않음)
    takeWhile(({y}) => y<=200, true) // y의 좌표가 200이상이면 종료 (y좌표 값을 반환 함)
).subscribe(
    next => console.log(next),
    noop,
    () => console.log('Complete!'),
);
