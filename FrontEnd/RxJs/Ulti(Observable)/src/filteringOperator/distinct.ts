import {of} from 'rxjs';
import {distinctUntilChanged} from 'rxjs/operators';

const numbers$ = of(1,'1',2,3,4,4,5);

numbers$.pipe(
    distinctUntilChanged()
).subscribe(console.log);
