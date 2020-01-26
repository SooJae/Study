import {fromEvent} from 'rxjs';
import {filter, map, mapTo, pluck} from 'rxjs/operators';

const keyup$ = fromEvent(document,'keyup');
const keycode$ = keyup$.pipe(
    map(event => event.code)
);

const keycodeWithPluck$ = keyup$.pipe(
    // pluck('code')
    pluck('target','nodeName') // nested된 곳에 유리하다.
);
// KeyD
// KeyS
// Space

const pressed$ = keyup$.pipe(
    mapTo('Key Pressed!') // 영구적인 값을 리턴한다.
);

const enter$ = keycode$.pipe(
    filter(code => code === 'Enter')
)

// keycode$.subscribe(console.log);
keycodeWithPluck$.subscribe(console.log);
enter$.subscribe(console.log);
