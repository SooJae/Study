import {interval} from 'rxjs';
import {filter, mapTo, scan, take, takeUntil} from 'rxjs/operators';

const counter$ = interval(1000);


counter$.pipe(
    mapTo(-1), // mapTo로 값을 고정해서 각각의 값을 -1로 하는 curr을 scan으로 넘겨줌
    scan((acc, curr) => {
        return acc + curr ;
    }, 10),
    filter(value => value >=0)
).subscribe(console.log);

