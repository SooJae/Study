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

setInterval(() => {},1000)
```


