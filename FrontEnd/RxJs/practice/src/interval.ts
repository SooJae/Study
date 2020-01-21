import { interval } from "rxjs";
import { take, first, last, takeWhile } from "rxjs/operators";

interval(1000).pipe(
    takeWhile(x => x < 4),
).subscribe(x => console.log(x));