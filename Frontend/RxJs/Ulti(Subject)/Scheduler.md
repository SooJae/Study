# Schedulers
time based operations & operators
testing

### When to emit or subscribe
observeOn
subscribeOn

## Sync 
```js
console.log('first');
console.log('second');
```

## Async
```js
setTimeout(() => console.log('setTimeout'));
console.log('first');
console.log('second');
// first
// second
// setTimeout
```
```js
setTimeout(() => console.log('setTimeout'));
queueMicrotask(() => console.log('microtask'));
requestAnimationFrame(() => console.log('anim'));
console.log('first');
console.log('second');
// first
// second
// microtask
// anim
// setTimeout
```

```js
setTimeout(() => console.log('async'),200) === asyncScheduler.ts.schedule(() => console.log('async'),200);
queueMicrotask(() => console.log('microtask')) === asapScheduler.schedule(() => console.log('microtask'));
requestAnimationFrame(() => console.log('anim')) === animationFrameScheduler.schedule(() => console.log('anim'));
queueScheduler.schedule(() => { // schedule additional tasks})
```
=> 더 쉽게
```js
asyncScheduler.ts.schedule(console.log,200,'async');
asapScheduler.schedule(console.log, null, 'microtask');
animationFrameScheduler.schedule(console.log,null,'aframe');
queueScheduler.schedule(()=> {
    // schedule additional tasks 
    })
```


# practice
```js
of(1,2,3).subscribe();
=>
of(1,2,3, asyncScheduler.ts).subscribe();
//////

interval(20).subscribe(observer);

interval(20).pipe(
observeOn(animationFrameScheduler)
).subscribe(observer);
```

# AsyncScheduler
```js
const observer = {
    next(val:any){console.log('next', val)},
    error(err:any){console.log('error', err)},
    complete(){console.log('complete!')}
};

// const sub = asyncScheduler.schedule(
//     console.log,
//     0,
//     'Hello World!'
// );
// sub.unsubscribe(); // 비동기가 아니므로 바로 끊는다.

// of(4,5,6, asyncScheduler).subscribe(observer);
of(4,5,6)
    .pipe(
        tap(val=> console.log('from tap', val)),
        //use delay!
        observeOn(asyncScheduler, 3000), // observerOn을 사용할 경우 위의 tap이 비동기가 실행되기 전에 실행된다.
//  from tap 4
//  from tap 5
//  from tap 6
//  next 4
//  next 5
//  next 6
//  complete!
        subscribeOn(asyncScheduler, 3000), // subscribeOn을 사용할 경우에는 tap이 비동기가 실행되기 전까지는 실행되지 않는다. 
//  from tap 4
//  next 4
//  from tap 5
//  next 5
//  from tap 6
//  next 6

    ).subscribe(observer);
of(1,2,3).subscribe(observer);
console.log('sync');
```

asyncScheduler은 setTimeout과 비슷하다.


# SubscribeOn vs ObserveOn
## SubscribeOn
SubscribeOn은 subscribe시 사용할 스레드를 지정.
구독중에 ObserveOn이 호출되어도 SubscribeOn의 스레드 지정에는 영향을 끼치지 않는다.

## ObserveOn
ObserveOn은 Observable이 다음처리를 진행할때 사용할 스레드를 지정
ObserveOn이 선언된 후 처리가 진행뒤 다른 ObserveOn이 선언시 다른 ObserveOn에서 선언한 스레드로 변경되어 이후 처리를 진행한다.

subscribeOn() 

- subscribeOn은 Observable 객체가 실행될 쓰레드를 정한다.

- 예를 들면 userApi.getUsers().subscribeOn(newThread()) 으로 사용했다면 getUsers() 가 newThread 안에서 실행됨.



observeOn() 

- observeOn은 연쇄되는 연산이 실행될 쓰레드를 정한다.

- 예를 들면 userApi.getUsers().subscribeOn(newThread()).observeOn(mainThread()).subscribe({

Log.d("Log", "Logging");

},{},{}) 으로 사용했다면 getUsers() 가 newThread 안에서 실행되고, subscribe() 코드가 메인 쓰레드 안에서 실행된다.


# asapScheduler
asapScheduler는 queMicroTask 또는 Promise.resolve와 비슷하다.





자바스크립트와 스케쥴러 : http://sculove.github.io/blog/2018/01/18/javascriptflow/
