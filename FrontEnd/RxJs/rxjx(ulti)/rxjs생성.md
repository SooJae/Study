Observable.create => new Observable로 변환해서 사용한다.


```js
import { Observable } from 'rxjs';

const observer = {
    next (value:any) { console.log('next', value)},
    error(error:any) {console.log ('error', error)},
    complete() {console.log('complete!')}
    // error: error => console.log('error', error),
    // complete: () => console.log('complete!')
};

const observable = new Observable(subscriber =>{
    let count = 0;
    const id = setInterval(() => {
        subscriber.next(count);
        subscriber.complete();
        subscriber.error();
        count += 1;
    }, 1000);
// error 또는 complete가 되면 return이 실행 된다.
    return () => {
        console.log('called');
        clearInterval(id);
    }
});

console.log('before');
observable.subscribe(
    observer
    // observer here
);
console.log('after');
```

before뒤에 subcribe가 실행되고 끝나면 after가 실행된다.
단 시간 관련된 setInterval이 들어갔으므로 비동기 처리를 하기 때문에 before, after 그 후에 subscribe가 된다.

```js
const subscription = observable.subscribe(
    observer
    // observer here
);

const subscriptionTwo = observable.subscribe(
    observer
);

// 위에서 만든 subscription 뒤에 add를 붙이면 subscription만 unsubscribe해줘도 Two가 자동적으로 unsubscribe된다.
subscription.add(subscriptionTwo);


setTimeout(()=>{
    subscription.unsubscribe();
},3500);
```


# 정리
옵저버블은 Push 방식이다.
옵저버블은 Cold가 기본값이다.
옵저버블은 여러가지 값을 발생시킬 수 있다.
옵저버블은 동기, 비동기값을 전달할 수 있다.
옵저버블은 취소가 가능하다.


# Operator 생성

이전 까지는 observable을 생성할때
```js
const observable = new Observable(subscriber => {
// manage producer
// manage completion
// manage cleanup on unsubscribe
});
```

식으로 생성했다.
```js
of('https://api.github.com.users/octocat')

from([1,2,3,4,5])

fromEvent(document,'click')

setInterval(() => {},1000);
=> interval(1000)로 변환
```
옵저버블은 fromEvent, from, of, timer, interval, range등으로 쉽게 만들 수 있다.


# of
```js
import {of} from 'rxjs'


function hello() {
    return 'hello world';
}

const observer = {
    next(val:any){console.log('next', val)},
    error(err:any){console.log('error', err)},
    complete(){console.log('complete!')}
}

const source$ = of(1,2,3,4,5);
source$.subscribe(observer);
console.log(hello());
/*
next 1
next 2
next 3
next 4
next 5
complete!
hello world
*/

```
동기적으로 실행된다는 것을 확인할 수 있다. (subscribe 이후에 console.log)

1,2,3,4,5를 적기 귀찮다면 range를 이용해보자

of(1,2,3,4,5) === range(1,5)



# from
```js
// 이터레이터를 생성한다 (제너레이터)
function* hello() {
    yield 'Hello';
    yield 'world';
}
=== ['Hello','world'] 처럼 된다.
const observer = {
    next(val:any){console.log('next', val)},
    error(err:any){console.log('error', err)},
    complete(){console.log('complete!')}
}

const source$ = from(hello());
source$.subscribe(observer);
/*
next Hello
next world
complete!
*/
```

이터러블인 것들을 flat(하나씩 뽑아낸다?)한다.
(flat이란?
 Flatmap은 Flattening 작업을 합니다. 
 예를들어 map에서 또다른 Observable을 return할때 기본적으로 map operator에서는 하나의 observable을 return하지만 내부에 또다른 observable을 리턴하게되면 2개의 스트림이 됩니다. 
 이때 하나로 줄여주는 stream을 평평하게 만들어 주는 역할을 합니다. 
 
 https://arnoldyoo.tistory.com/17)
 
 
of는 ([1,2,3,4])일 경우 [1,2,3,4]를 뽑아내고, 위의 예시에서도
Object [Generator] {} 를 뽑아낸다.

flatten이란?
of(1,2,3,4)로 했을 경우
map(num => `${num}`)
을 하면 1,2,3,4로 값을 리턴한다.
이렇게 하면 쉬운데...
어려운 것은 사용자가 map함수로부터 observable을 리턴했을 때이다.

of로 하면 [Object object]로 결과가 출력된다... 왜냐하면 Observable을 리턴하니까


https://medium.com/@shairez/a-super-ninja-trick-to-learn-rxjss-switchmap-mergemap-concatmap-and-exhaustmap-forever-88e178a75f1b


각종 옵저버블 연습
https://stackblitz.com/edit/i-switched-a-map-examples




/*
 * If you need the first item to be emitted on an interval
 * different than the rest, you can use the timer operator instead.
 * For example, let's have the first item emit immediately, followed
 * by a value every 1000ms after.
 */
// const timer$ = timer(0, 1000); == Interval(1000)

/*
 * You can also emit a single item after a specified duration, then complete,
 * by just supplying the first argument.
 */
// const timer$ = timer(1000);
