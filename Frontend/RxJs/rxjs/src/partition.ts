// RxJS v6.5+
import {merge, of, from, partition, interval} from 'rxjs';
import {map, catchError, take} from 'rxjs/operators';

// split on success or error
const [winSource$, loseSource$] = partition(interval(500), x => Math.random() < 0.7);

winSource$.pipe(
    map(x => `당첨 ${x}`),
    take(10))
    .subscribe(result => console.log(result));

loseSource$.pipe(
    map(x => `꽝!! ${x}`),
    take(10)
).subscribe(result => console.log(result));