// groupBy 연산자로 당첨과 꽝을 출력하는 예

// 1. keySelector

import {interval} from "rxjs";
import {groupBy, map, mergeMap, take, tap} from "rxjs/operators";

interval(500).pipe(
    take(10),
    groupBy(x =>
        Math.random() < 0.7),
    mergeMap(
        groupedObservable =>
            groupedObservable.key === true
                ? groupedObservable.pipe(map(x => `당첨!! (${x})`))
                : groupedObservable.pipe(map(x => `꽝!! (${x})`))
    )
).subscribe(result => console.log(result));