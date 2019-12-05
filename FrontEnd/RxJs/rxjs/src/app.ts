import {range} from 'rxjs';
import {filter, map, tap} from 'rxjs/operators';

range(1, 10).pipe(
    tap(
        (x) => console.log('tap:' + x),
        (err) => console.error(err),
        () => console.log('tap complete')
    ),
    filter(x => !(x % 2)),
    map(x => x + 1),
).subscribe(
    (x) => console.log('subscribe:' + x),
    (err) => console.error(err),
    () => console.log('complete')
);
