import { filter, map } from 'rxjs/operators';
import { Observable,of,pipe } from 'rxjs';
 
const nums = of(1, 2, 3, 4, 5);
 
// 옵저버블을 처리하는 함수를 정의합니다.
const squareOddVals = pipe(
  filter((n: number) => n % 2 !== 0),
  map(n => n * n)
);
 
// filter()와 map()을 실행하는 옵저버블을 생성합니다.
const squareOdd = squareOddVals(nums);
 
// 구독을 시작합니다.
squareOdd.subscribe(x => console.log(x));