Observable은 1:1 통신이다.
예를 들어 옵저버블은 3개의 subscribe를 하면 세개가 각각 독립적이다.

3개중 하나가 완료되더라도 나머지 2개에 영향을 끼치지 않는다.

Observable   =   Subject  =   Observable
pipe                           next
subscribe                      error
                               complete

Subject는 세가지의 Observer들이 subscribe를 하면 하나의 Subject에 접근할 수있다.


## asObservable이란
Subject 기능을 없애기 위해 사용하는 메소드 이다.
예를들어 subject.asObserble을 하고 나서부터는 해당 메소드로
result.next('Hello')등을 사용하면 에러가 발생한다. 
https://stackoverflow.com/questions/36986548/when-to-use-asobservable-in-rxjs
https://medium.com/@rkdthd0403/rxswift-subject-99b401e5d2e5

asObservable 보다 subject를 노출하는 것이 좋다?(타입스크립트에서 Observable로 return)
https://stackoverflow.com/questions/48448364/should-rxjs-subjects-be-public-in-the-class



# Subject ConnectableObservable 
https://moka.land/android/rxAndroid_study/


#Behaivor Subject
```js
const subject = new Subject();

const subscription = subject.subscribe(
    observer
);

subject.next('Hello');

const secondSubscription = subject.subscribe(
    observer
);

subject.next('World');
/*
next Hello
next World
next World
*/
```
```js
const subject = new BehaviorSubject('Hello');

...

/*
next Hello // 얘는 subject.next('Hello');
next Hello
next Hello
next World
next World
*/
```


```js
...

setTimeout(() => {
    subject.subscribe(
        observer
    )
}, 3000);

/*
next Hello 
next Hello
next Hello
next World
next World
next World // 마지막 값인 World 출력 
*/
```


# 코드 분석
```js
this._stateUpdates.pipe(
            tap(console.log),
            scan((acc, curr) => {
                return {...acc, ...curr}; // 이전값에 최신값을 concat한다 (변화가 생긴 것만 수정한다.)
            }, initialState),
).subscribe(this._store); // _store은 subject이다. 즉 값이 변화되면 해당 subject에게 변화를 알린다.
```

# ReplaySubject
```js
const observer = {
    next(val:any){console.log('next', val)},
    error(err:any){console.log('error', err)},
    complete(){console.log('complete!')}
};

const subject = new ReplaySubject(2); // 숫자를 적지 않으면 그 전의 next 요소를 전부 갖고온다.(버퍼역할)
subject.next('hello');
subject.next('world');
subject.next('goodbye');
subject.subscribe(observer);
```

#AsyncSubject

```js
const subject = new AsyncSubject();

subject.subscribe(observer);
subject.subscribe(observer);

subject.next('Hello');
subject.next('World');
subject.next('GoodBye');

subject.complete();
```

complete가 되기 전까지 next한 값들이 출력되지 않고, complete가 되면 가장 마지막 값이 출력된다.
