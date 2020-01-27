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
setTimeout(() => console.log('async'),200) === asyncScheduler.schedule(() => console.log('async'),200);
queueMicrotask(() => console.log('microtask')) === asapScheduler.schedule(() => console.log('microtask'));
requestAnimationFrame(() => console.log('anim')) === animationFrameScheduler.schedule(() => console.log('anim'));
queueScheduler.schedule(() => { // schedule additional tasks})
```
=> 더 쉽게
```js
asyncScheduler.schedule(console.log,200,'async');
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
of(1,2,3, asyncScheduler).subscribe();
//////

interval(20).subscribe(observer);

interval(20).pipe(
observeOn(animationFrameScheduler)
).subscribe(observer);
```
