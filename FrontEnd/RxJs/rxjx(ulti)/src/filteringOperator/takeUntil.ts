import {fromEvent, interval} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

const counter$ = interval(1000);
const click$ = fromEvent(document, 'click');

counter$.pipe(
    takeUntil(click$) // click observable로 멈춘다.
).subscribe(console.log);
