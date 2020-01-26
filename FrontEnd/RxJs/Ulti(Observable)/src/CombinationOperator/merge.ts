import { fromEvent, merge } from 'rxjs';

const keyup$ = fromEvent(document, 'keyup');
const click$ = fromEvent(document, 'click');

// keyup$.subscribe(console.log);
// click$.subscribe(console.log);

merge(
    keyup$,
    click$
).subscribe(console.log);

