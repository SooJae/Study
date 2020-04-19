import { range, NEVER } from "rxjs";
import { filter, map } from "rxjs/operators";

// 1~10 중 짝수 필터
range(1, 10).pipe(
  filter(x => x % 2 === 0),
  map(x => x +1),
).subscribe(x => console.log(x));