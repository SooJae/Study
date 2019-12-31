import { interval, of } from "rxjs";
import { skipUntil, take, distinctUntilChanged, pluck, map } from "rxjs/operators";

of(
    {a: 1, b: 10},
    {a: 1, b: 10},
    {a: 2, b: 20},
    {a: 3, b: 30},
    {a: 3, b: 30},
    {a: 2, b: 20}
  ).pipe(
    map(x => x.a)
  ).subscribe(x => console.log(x));