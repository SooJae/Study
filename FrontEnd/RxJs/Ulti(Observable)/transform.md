```js
click$.pipe(
    switchMap(()=>interval$)
).subscribe(console.log);
// 클릭을 하면 이전 옵저버블이 취소된다.


click$.pipe(
    concatMap(()=>interval$)
).subscribe(console.log);
// 클릭을 계속하면 대기하고 있기 때문에 traffic jam이 생긴다


click$.pipe(
    concatMap(()=>interval$.pipe(take(3))) 
).subscribe(console.log);
// 3초면 끝나기 때문에 traffic jam이 완화된다.
```